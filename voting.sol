pragma solidity ^0.6.4;
//Mentioning what version of solidity for the compiler to run

//Using solc@0.6.4 for this

contract Voting //a contract is like a class in java
{
	mapping(bytes32 => uint256) public votesRecieved;
	//mapping is a kind of associative array or hashing where bytes32 is the datatype of the key and uint256 is the datatype of value

	bytes32[] public candidateList; //Solidity doesn't allow string arrays yet so bytes32 array


	/*
    	This constructor is invoked only once when the code is pushed on the blockchain. The keyword "memory" means that the parameter is stored in the memory and the keyword public means that it's accessible to everyone but can't be changed or modified by anyone
	*/
	constructor(bytes32[] memory candidateNames) public 
	{
		candidateList = candidateNames;
	}

	/*
		view keyword means that this function doesn't modify any values and only viewing them. Since this function returns something, we mention a returns keyword and its return type which is uint256
	*/
	function totalVotes(bytes32 candidate) public view returns (uint256)
	{
		require(validateCandidate(candidate));
		return votesRecieved[candidate];  //Returns votes recieved by the candidate
	} 

	function voteForCandidate(bytes32 candidate) public
	{
		require(validateCandidate(candidate));
		votesRecieved[candidate]+=1;
	}

	/*
		Checking if the candidate is valid or not. Returns a bool value
	*/

	function validateCandidate(bytes32 candidate) public view returns (bool)
	{
		for(uint i=0; i<candidateList.length;i++)
		{
			if(candidateList[i]==candidate)
			{
				return true;
			}
		}
		return false;
	}
}	