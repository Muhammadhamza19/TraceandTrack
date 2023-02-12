// import faker from 'faker';
import React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
// material
import { Card, Typography, CardHeader, CardContent } from '@mui/material';
import {
  Timeline,
  TimelineItem,
  TimelineContent,
  TimelineConnector,
  TimelineSeparator,
  TimelineDot
} from '@mui/lab';
// utils
// import { fDateTime } from '../../../utils/formatTime';

import getWeb3 from "../getWeb3";
import { useState, useEffect } from 'react';
import document from "../contracts/tracking.json";
import { Box } from '@mui/system';

// ----------------------------------------------------------------------

const TIMELINES = [
  {
    title: 'Manufacturer',
    time: "",
    type: 'order1'
  },
  {
    title: 'Transporter',
    time: "",
    type: 'order2'
  },
  {
    title: 'Distributer',
    time: "",
    type: 'order3'
  },
  {
    title: 'Regional Centre',
    time: "",
    type: 'order4'
  }
];

// ----------------------------------------------------------------------

// OrderItem.propTypes = {
//   item: PropTypes.object,
//   isLast: PropTypes.bool
// };

// function OrderItem({ item, isLast }) {


//   const { type, title, time } = item;
//   return (
//     <TimelineItem>
//       <TimelineSeparator>
//         <TimelineDot
//           sx={{
//             bgcolor:
//               (type === 'order1' && 'primary.main') ||
//               (type === 'order2' && 'primary.main') ||
//               (type === 'order3' && 'primary.main') ||
//               (type === 'order4' && 'primary.main') ||
//               'error.main'
//           }}
//         />
//         {isLast ? null : <TimelineConnector />}
//       </TimelineSeparator>
//       <TimelineContent>
//         <Typography variant="subtitle2"><h2>{title}</h2></Typography>
//         <Typography variant="caption" sx={{ color: 'text.secondary' }}>
//           <h4></h4>
//         </Typography>
//       </TimelineContent>
//     </TimelineItem>
//   );
// }

export default function AppOrderTimeline({autocheck,reset}) {
  console.log(autocheck)
  const [account,setAccount]=useState('');
  const [contract,setContract]=useState(null);
  const [mColor, setmState]=useState('grey');
  const [mTime, setmTime]=useState("");
  const [tTime, settTime]=useState("");
  const [dTime, setdTime]=useState("");
  const [rTime, setrTime]=useState("");
  const [tColor, settState]=useState('grey');
  const [dColor, setdState]=useState('grey');
  const [rColor, setrState]=useState('grey');
  const [timeAr, setTimeAr]=useState([]);
  

  OrderItem.propTypes = {
    item: PropTypes.object,
    isLast: PropTypes.bool
  };

  function OrderItem({ item, isLast,times}) {
    let { type, title, time } = item;
    if(autocheck){
     
      if("mc" == autocheck){
        setmState('green');
      }
      if("tc"== autocheck){
        setmState('green');
        settState('green');
      }
      if("dc"==autocheck){
        setmState('green');
        settState('green');
        setdState('green');
      }
      if("rc"==autocheck){
        type='order4'
        setmState('green');
        settState('green');
        setdState('green');
        setrState('green');
      }
    }
    return (
      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot
            sx={{
              bgcolor:
                (type === 'order1' && mColor)||
                (type === 'order2' && tColor) ||
                (type === 'order3' && dColor) ||
                (type === 'order4' && rColor) ||
                'error.main'
            }}
          />
          {isLast ? null : <TimelineConnector />}
        </TimelineSeparator>
        <TimelineContent>
          <Typography variant="subtitle2"><h2>{title}</h2></Typography>
          <Typography variant="subtitle2"><h3>{time}</h3></Typography>
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            <h4></h4>
          </Typography>
        </TimelineContent>
      </TimelineItem>
    );
  }

const loadContract= async()=>{
    const web3 = await getWeb3();
    const accounts = await web3.eth.getAccounts()
    console.log(accounts)
    setAccount(accounts[0])

    const networkId = await web3.eth.net.getId()
    const networkData = document.networks[networkId]
      if(networkData){            
          const abi = document.abi
          const address = networkData.address
          var contract = new web3.eth.Contract(abi, address)
           setContract(contract)
          window.alert('Smart Contract Deployed to Network')
          return contract
      }else{
          window.alert('Smart Contract not deployed to detected network')
      }
    }
  useEffect(async ()=>{
    

    const result=await loadContract();
    setTimeAr(TIMELINES)
    console.log(result)
    if(result){
      update(result)
    }
    if(reset){
      setmState("grey")
      settState("grey")
      setdState("grey")
      setrState("grey")
      setTimeAr([
        {
          title: 'Manufacturer',
          time: "",
          type: 'order1'
        },
        {
          title: 'Transporter',
          time: "",
          type: 'order2'
        },
        {
          title: 'Distributer',
          time: "",
          type: 'order3'
        },
        {
          title: 'Regional Centre',
          time: "",
          type: 'order4'
        }
      ])
    }
    console.log(timeAr)
  },[reset]);

  const update = async(result)=>{
    let contracts
    
    if(result.methods){
      contracts=result;
    }
    else{
      contracts=contract
    }
    const mc = await contracts.methods.getmColor().call();
    const mdate= await contracts.methods.getmTime().call();
    const date = new Date(mdate * 1000);
   
    if(mc){
      setmState('green');
      if(timeAr.length){
        const mformattedDate = date.toLocaleString();
        setmTime(mformattedDate);
        let temp=timeAr;
        temp[0].time=mformattedDate;
        setTimeAr(temp)
        
      }
      
    }
    const tc = await contracts.methods.gettColor().call();
    const tdate= await contracts.methods.gettTime().call();
    const date1 = new Date(tdate * 1000);
    const tformattedDate = date1.toLocaleString();
    if(tc){
      settState('green');
      settTime(tformattedDate);
      if(timeAr.length){
        let temp=timeAr;
        temp[1].time=tformattedDate;
        setTimeAr(temp)
        
      }
    }
    const dc = await contracts.methods.getdColor().call();
    const ddate= await contracts.methods.getdTime().call();
    const date2 = new Date(ddate * 1000);
    const dformattedDate = date2.toLocaleString();
    if(dc){
      setdState('green');
      setdTime(dformattedDate);
      if(timeAr.length){
        let temp=timeAr;
        temp[2].time=dformattedDate;
        setTimeAr(temp)
        
      }
    }
    const rc = await contracts.methods.getrColor().call();
    const rdate= await contracts.methods.getrTime().call();
    const date3 = new Date(rdate * 1000);
    const rformattedDate = date3.toLocaleString();
    if(rc){
      setrState('green');
      setrTime(rformattedDate);
      if(timeAr.length){
        let temp=timeAr;
        temp[3].time=rformattedDate;
        setTimeAr(temp)
        
      }
    }
  }

  return (
    <Card
      sx={{
        '& .MuiTimelineItem-missingOppositeContent:before': {
          display: 'none'
        }
      }}
    >
      <CardHeader title="Order Timeline" />
      <CardContent>
        <Timeline>
          {timeAr.map((item, index) => (
            <Box>
              <OrderItem key={item.title} item={item} isLast={index === TIMELINES.length - 1}/>
            </Box>
          ))}
        </Timeline>
      </CardContent>
      <Button onClick={update}>Update</Button>
    </Card>
  );
}
