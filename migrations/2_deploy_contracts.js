/* const SimpleStorage = artifacts.require("SimpleStorage");

module.exports = function (deployer) {
  // below is use since there is no constructor in the contract
  deployer.deploy(SimpleStorage);

  // below is use if there is constructor in the contract e.g in hashsurance
  deployer.deploy(SimpleStorage, 'Alabi');
}; */

const _InsurengineC = artifacts.require("_InsurengineC");
const StructTemi = artifacts.require("StructTemi");

module.exports = async function (deployer) {
  // await deployer.deploy(StructTemi);
  await deployer.deploy(_InsurengineC, '0x424e4a2AD3A92cE9B4B617155dB224EF34a53410');


};

