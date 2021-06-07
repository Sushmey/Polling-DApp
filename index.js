var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
var account;
var candidateInputField = document.getElementById('candidate');
var button = document.getElementById('submitButton');
web3.eth.getAccounts().then((f) =>{account = f[0];},(reason)=>{console.log("wonky slush");});
var abi = JSON.parse('[{"constant":true,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"totalVotes","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"validCandidate","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"bytes32"}],"name":"votesReceived","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"candidateList","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"voteForCandidate","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"candidateNames","type":"bytes32[]"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"}]');

var contract = new web3.eth.Contract(abi);

contract.options.address = "0x7e8c83dabdf0fcece7b1fe82d7054a15cf052a65"; //Contract address created when block is created

candidates = {"Brian Quinn": "candidate-1", 'Anthony Padilla': "candidate-2", "Shahzeb Khan": "candidate-3", "Dee Reynolds": "candidate-4"};

button.addEventListener('click',function(){
  candidateInputField.value = '';
});

function voteForCandidate(candidate)
{
    candidateName = $('#candidate').val();
    console.log(candidateName);
    if (candidateName in candidates)
    {
      console.log(candidateName in candidates)
      contract.methods.voteForCandidate(web3.utils.asciiToHex(candidateName)).send({from: account}).then((f)=>{
        let divId = candidates[candidateName];
        contract.methods.totalVotes(web3.utils.asciiToHex(candidateName)).call().then((f)=>{
          $('#'+divId).html(f);
          alert("Thank you for voting!");
        },(reason)=>{console.log("wonky slush pt.2");})
      })
    }
    else
    {
      alert("Candidate doesn't exist, please check again");
    }
}

$(document).ready(function() {
 candidateNames = Object.keys(candidates);

 for(var i=0; i<candidateNames.length; i++) {
 let name = candidateNames[i];
  
 contract.methods.totalVotes(web3.utils.asciiToHex(name)).call().then((f) => {
  $("#" + candidates[name]).html(f);
 },(reason)=>{console.log("wonky slush pt.3");})
 }
});

























