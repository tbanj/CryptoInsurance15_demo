pragma solidity ^0.8.0;
import "./_validators_hub.sol"; 
import "./Hashurance_T.sol";        //Imports Hashurance token
import "./policy_contract.sol";     //Imports policy contract to create and manage policies.

contract _InsurengineC{
     //Hushurance token contract object.
    HashuranceTokenC public hashuranceTokenC;
    
     //Holds the entire policies in the protocol.
    PolicyC[] public policyArchieve;

     //Validators hub contract object.
    voteNvalidateC public validatorsHub;

    // to validate if the require network is selected on metamask
    bool public networkTypeBSC = true;

     

  struct ApplicationForm{
      address applicant;       //Who is applying to be insured
      string whatToInsure;     // Will convert to bytes later. //What item do you want to insure.
      uint estimatedCost;      //What's your personal valuaton of this item.
      uint applicationTime;    //Time of application.
      uint toApproveCount;     //Number of validators who approved this application.
      uint toDenyCount;        //Number of validators who declined this application. 
      uint finalDecision;      //0 = not decided, 2 = Declined, 4 = Approved.
      string reasonForDenial;  //Possible reasons for a rejection.
      string applicationID;      //Application Id.
      uint prequelID;          //Previous application Id if this is a re-application.
    }

    

  struct receiptTemplate{
        uint blockNumber;
        address from_;
        address to_contract_addr;
        address receiver;
        uint paymentTime;
        uint value;
        string transactionHash;
        string applicationID;
    }

//Stores all insurance applications, before they get approved and transformed to a policy.
    ApplicationForm[] public applications;

    // struct for input data of form 
     struct inputApplyForm{ 
      string insureName; 
      uint estimatedCost;
      string applicationID;  
      uint prequelID;  
      string insurerAddress;
      string initialDeposit;
      string estimatedTenure;
            
    }

  constructor(address vHubAddress){
      hashuranceTokenC = new HashuranceTokenC(msg.sender); //Creates instance of Hashurance token.
      validatorsHub = voteNvalidateC(vHubAddress);
      }

  function getAppication(string memory applicationID)public view returns(ApplicationForm memory){
    //   ApplicationForm memory form = applications[applId];
    //   return form;

      uint i;
    
  for(i = 0; i < applications.length; i++)
  {
   
    if((keccak256(abi.encodePacked((applications[i].applicationID))) == keccak256(abi.encodePacked((applicationID)))))
    {
        
        // ApplicationForm memory form = applications[i];
      return applications[i];
    }
  }
    
//   if(i >= arr.length)
//     return false;
// }

    }

  function submitPremium(address policyAddress, receiptTemplate memory receipt, uint direction)public returns(bool){
       //Confirm and process funds.
       receipt.paymentTime = block.timestamp; //Will later change this to the timestamp returned at the front end.
       hashuranceTokenC.transfer(policyAddress, receipt.value); //Move HSHT to policy contract.
       PolicyC destinationPolicy = PolicyC(policyAddress);
       destinationPolicy.logPremiumHistory(receipt.paymentTime, receipt.value);
       if(direction == 3){ //True when its time to withdraw.
           //Transfer principal amount of tokens from policy account to holder's account.
           hashuranceTokenC.transferFrom(policyAddress, destinationPolicy.policy_Holder(), destinationPolicy.Principal());
       }
       return true;
  }

   //Function to apply for an insurance.
   // @inputData. prequel should be 0 if its a fresh insurance application.
//    function applyForInsurance(string memory insuring, uint cost, uint prequel, receiptTemplate memory receipt) public returns(bool){
  function applyForInsurance(inputApplyForm memory inputData, receiptTemplate memory _receipt) public returns(bool){
                                                
       
       //Confirm and process funds.
       _receipt.paymentTime = block.timestamp;
       string memory appID = inputData.applicationID;
       HashuranceTokenC.receiptTemplate memory _data = reformReceipt(_receipt);
      hashuranceTokenC.updateDepoPoolEx(_data.blockNumber,
      _data.from_, _data.to_contract_addr,
      _data.receiver, _data.paymentTime, _data.value,
      _data.transactionHash, _data.applicationID);
       //Submit application after successful transfer
     // ApplicationForm memory newApplicationForm = ApplicationForm(msg.sender, insuring, cost, block.timestamp, 0, 0, 0, "N/A", applications.length, prequel); //Application form filled, with approved variable set to false.
      ApplicationForm memory newApplicationForm = ApplicationForm(msg.sender, inputData.insureName, inputData.estimatedCost, block.timestamp, 0, 0, 0, "N/A", inputData.applicationID, inputData.prequelID); //Application form filled, with approved variable set to false.
      applications.push(newApplicationForm);

       //Add user to validator's court, since he now has hashurance tokens locked within the contract.
      validatorsHub.addToCourt(msg.sender, _receipt.value);/////////////////
      return true;
    }

    function reformReceipt(receiptTemplate memory _receipt_)private view returns(HashuranceTokenC.receiptTemplate memory){
      //Transfer BUSD to Hashurance Engine at frontend and wait for a response (transaction hash).
      //Use the response to create a receipt then call this function.

      //Confirm payment of BUSD from the CALLER of this function (applicant).
      //Use the response to send (separate and lock) the Hashsurance token equivalent of BUSD that was sent by the applicant.
    
    
      HashuranceTokenC.receiptTemplate memory receipt_toToken;  //Expensive means, but it can work till we find an alternative. 
      receipt_toToken.from_ = _receipt_.from_;
      receipt_toToken.to_contract_addr = _receipt_.to_contract_addr;
      receipt_toToken.paymentTime = block.timestamp;
      receipt_toToken.receiver = _receipt_.receiver;
      receipt_toToken.value = _receipt_.value;
      receipt_toToken.transactionHash = _receipt_.transactionHash;
      return receipt_toToken;
  }

  function prepForInspection(string memory applicationID, uint decision,
   string memory reason)public returns(bool){
      
    uint i;
    
  for(i = 0; i < applications.length; i++)
  {
    if((keccak256(abi.encodePacked((applications[i].applicationID))) == keccak256(abi.encodePacked((applicationID)))))
    {
      ApplicationForm memory aForm = applications[i];
      aForm.reasonForDenial = reason; //Save the lastest reason, if its not empty.
      uint[3] memory returnedValues = validatorsHub.inspect(applicationID,decision, aForm.toApproveCount, aForm.toDenyCount);
      aForm.toApproveCount = returnedValues[0];
      aForm.toDenyCount = returnedValues[1];
      aForm.finalDecision = returnedValues[2];
      if(aForm.finalDecision == 4){
           //Clear reasons for denial, entered by validators, if the application was approved.
          aForm.reasonForDenial = "N/A";
      }
      applications[i] = aForm;
      return true;
    }
  }
    
  
}
      
  

  function prepForClaimInspection(address policyAddress, uint decision, string memory reason)public returns(bool){
      PolicyC destinationPolicy = PolicyC(policyAddress);
      uint[3] memory returnedValues = validatorsHub.inspectClaimRequest(
          policyAddress,
          decision,
          destinationPolicy.toApproveCount(),
          destinationPolicy.toDenyCount());
      destinationPolicy.enterInspectionResult(returnedValues[0], returnedValues[1], returnedValues[2]);
      destinationPolicy.prepForWithdrawal(address(hashuranceTokenC));
      return true;
  }

  function createPolicyC(string memory applicationID) public{
      uint i;
      for(i = 0; i < applications.length; i++)
  {
    if((keccak256(abi.encodePacked((applications[i].applicationID))) == keccak256(abi.encodePacked((applicationID)))))
    {
        ApplicationForm memory approvedApplication = applications[i]; //Might conme back to this later.
      require(msg.sender == approvedApplication.applicant, "Not the applicant");
      require(approvedApplication.finalDecision == 4, "Not approved");  //If its approved;
      HashuranceTokenC.receiptTemplate memory _templat = hashuranceTokenC.getReceipts(applicationID);
      PolicyC policy_ = new PolicyC(
          approvedApplication.applicant, 
          applicationID, 
          approvedApplication.whatToInsure, 
          approvedApplication.estimatedCost,
          _templat.value,
          _templat.paymentTime,
          address(hashuranceTokenC));
      policy_.computeVariables();
      policyArchieve.push(policy_);
       //Release equivalent HSHT funds, previously minted, to newly created policy contract.
      hashuranceTokenC.purgeDepoPool(applicationID, address(policy_), _templat.value);
    }
  }
      
    }

    function claimInsurance(address policyAddress)public{
        PolicyC destinationPolicy = PolicyC(policyAddress);
         //Ensures the claimer is the holder of this policy.
        require(msg.sender == destinationPolicy.policy_Holder(), "Cannot claim!");
        destinationPolicy.claim();
    }

    function withdrawFromPolicy(address policyAddress)public{
        PolicyC destinationPolicy = PolicyC(policyAddress);
         //Ensures the claimer is the holder of this policy.
        require(msg.sender == destinationPolicy.policy_Holder(), "Restricted!");
        hashuranceTokenC.transferFrom(address(destinationPolicy), destinationPolicy.policy_Holder(), destinationPolicy.Principal());
    }

     // to check network selected
    function checkNetwork() external view returns(bool) {
    return networkTypeBSC;
  }

    // to get token name
function getHashTokenName() external view returns(string memory) {
    return hashuranceTokenC.getTokenName();
      
  }

  // return all the list of policies
  function getPolicies() public view returns(PolicyC[] memory) {
    return policyArchieve;
  }

// return list of policy for a particular user
  function getPolicy() public view returns(PolicyC[] memory) {
    return policyArchieve;
  }

  // return total count of all policies
  function getPoliciesCount() public view returns(uint) {
    uint countPolicy = policyArchieve.length;
    return countPolicy;
  }

  function getApplications() public view returns(ApplicationForm[] memory) {
      return applications;
  } 


}