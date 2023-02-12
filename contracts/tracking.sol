//SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <=0.8;
pragma experimental ABIEncoderV2;

contract tracking{
    bool mColor=false;
    bool tColor=false;
    bool dColor=false;
    bool rColor=false;
    uint public mtime;
    uint public dtime;
    uint public ttime;
    uint public rtime;
  
  function getmTime() public view returns(uint){
    return mtime;
  }        
    function gettTime() public view returns(uint){
    return ttime;
  } 
    function getdTime() public view returns(uint){
    return dtime;
  } 
    function getrTime() public view returns(uint){
    return rtime;
  }  

    function setmColor() public{
        mColor=true;
        mtime = block.timestamp;
    }
    function settColor() public{
        tColor=true;
        ttime = block.timestamp;

    }
    function setdColor() public{
        dColor=true;
        dtime = block.timestamp;

    }
    function setrColor() public{
        rColor=true;
        rtime = block.timestamp;

    }
    function reset() public{
        mColor=false;
        tColor=false;
        dColor=false;
        rColor=false;
        mtime=0;
        dtime=0;
        ttime=0;
        rtime=0;
    }
    function getmColor() public view returns (bool exists){
        return mColor;
    }
    function gettColor() public view returns (bool exists){
        return tColor;
    }
    function getdColor() public view returns (bool exists){
        return dColor;
    }
    function getrColor() public view returns (bool exists){
        return rColor;
    }
}