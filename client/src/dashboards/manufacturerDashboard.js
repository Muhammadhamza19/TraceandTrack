// import React from "react";
// import getWeb3 from "../getWeb3";
// import { useState, useEffect } from 'react';
// import document from "../contracts/Manufacturer.json";

// function ManuDash(){
    
//     // const [account,setAccount]=useState('');
//     // const [contract,setContract]=useState(null);

//     // useEffect(()=>{
//     // const loadContract= async()=>{
//     //     const web3 = await getWeb3();
//     //     const accounts = await web3.eth.getAccounts()
//     //     console.log(accounts)
//     //     setAccount(accounts[0])

//     //     const networkId = await web3.eth.net.getId()
//     //     const networkData = document.networks[networkId]
//     //         if(networkData){            
//     //             const abi = document.abi
//     //             const address = networkData.address
//     //             const contract = new web3.eth.Contract(abi, address)
//     //             setContract(contract)
//     //         }else{
//     //             window.alert('Smart Contract not deployed to detected network')
//     //         }
//     // }

//     // const contract=loadContract();
//     // },[]);


//     // const details = contract.methods.getManuDetails(account).call()
//     // console.log(details)







//     return <h1>Manufacturer Dash</h1>
// }
// export default ManuDash


// material
import React from 'react';

import { Box, Grid, Container, Typography } from '@mui/material';
// components
import Page from '../dashcomponents/Page';
// import {
// //   AppTasks,
// //   AppNewUsers,
// //   AppBugReports,
// //   AppItemOrders,
//   AppWeeklySales
// //   AppOrderTimeline
// } from '../dashcomponents/AppWeeklySales';
import AppWeeklySales from '../dashcomponents/AppWeeklySales';
import AppOrderTimeline from '../dashcomponents/AppOrderTimeline';
// ----------------------------------------------------------------------
import getWeb3 from "../getWeb3";
import { useState, useEffect } from 'react';
import document from "../contracts/Transporter.json";
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import tracking from "../contracts/tracking.json";
import moment from "moment"

export default function DashboardApp() {
  const [account,setAccount]=useState('');
  const [contract,setContract]=useState(null);
  const [selectedTran, setTran]=useState(null);
  const [selectedTranId, setTranId]=useState(null);
  const [tranList, setTranList] = useState([]);
  const [tranIdList,setTranIdList] = useState([]);
  const [tableData, settableData] = useState([]);
  const [trackContract, settrackContract]=useState(null);
  const [autocheck, setAutocheck]=useState(false);
  const [time, setTime]=useState("");
  
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
          const c = new web3.eth.Contract(abi, address)
          setContract(c)
      }else{
          window.alert('Smart Contract not deployed to detected network')
      }

      const tracknetworkData = tracking.networks[networkId]
      if(tracknetworkData){            
          const abi = tracking.abi
          const address = tracknetworkData.address
          const contract = new web3.eth.Contract(abi, address)
          await settrackContract(contract)
      }else{
          window.alert('Smart Contract not deployed to detected network')
      }
  }

  const handleChange = (event) => {
    setTran(event.target.value);
  };

  const handleSubmit = async(event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log(data.get('quantity') +" "+ selectedTran);
    await contract.methods.getPackage(data.get('quantity').toString())
    .send({ from: account }).then( (r)=>{
      // const web3 = await getWeb3();
      // let block = await web3.eth.getBlock(r.blockNumber).timestamp
      // var date1= new Date(block*1000);
      // console.log(date1.toUTCString())
    }).catch(err=>console.log(err))
    setAutocheck("mc")
    await trackContract.methods.setmColor().send({ from: account }).then((r)=>{}).catch(err=>console.log(err))

    const mc = await trackContract.methods.getmColor().call();
    const mdate= await trackContract.methods.getmTime().call();
    const date = new Date(mdate * 1000);
    const formattedDate = date.toLocaleString();
    console.log(formattedDate)
    setTime(formattedDate)
    console.log(mc)

  };

  
  


  async function getTable() {
		const req = await fetch('http://localhost:1337/api/orders', {
			headers: {
				'x-access-token': localStorage.getItem('token'),
			},
		})
		const data = await req.json()
		if (data.status === 'ok') {
      console.log(data)
			settableData(Array.from(data.userMap))
		} else {
			alert(data.error)
		}
	}


  useEffect(()=>{

    const load = async()=>{
      loadContract();
      getTable();
    }

    load();

    
},[]);

// const confirmSelection = async(event)=>{
//   for(var k=0;k<tranList.length;k++){
//     if(tranList[k]===selectedTran){
//       setTranId(tranIdList[k])
//       break
//     }
//   }  
//   console.log(selectedTranId)
// }


async function  seeDetails ()
{
  console.log("hello")
  const details = await contract.methods.getTranNames().call()
  console.log(details)
}

const chooseSelect = async() =>{
  const traList = await contract.methods.getTranNames().call();
  setTranList(traList);
  setTran(traList[0]);
  const traAdd = await contract.methods.getTranAdd().call();
  setTranIdList(traAdd);
  setTranId(traAdd[0]);
}
  
  console.log(tableData)

  return (
    <Page title="Dashboard | Minimal-UI">
      <Container maxWidth="xl">
        <Box sx={{ pb: 5 }}>
          <Typography variant="h4">Hi, Welcome back</Typography>
        </Box>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <AppWeeklySales />
          </Grid>

{/* 
          <Grid item xs={12} sm={6} md={3}>
            <div>
            
            </div>
          </Grid> */}
          {/* <Grid item xs={12} sm={6} md={3}>
            <AppItemOrders />
          </Grid> */}
          {/* <Grid item xs={12} sm={6} md={3}>
            <AppBugReports />
          </Grid> */}



          <Grid item xs={12} md={6} lg={4}>
            <AppOrderTimeline  autocheck={autocheck} times={time}/>
          </Grid>

          <Grid item xs={9} md={6} lg={8}>
          <div>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 300 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">Region</TableCell>
                    <TableCell align="center">Count</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>        
                  {tableData.map((row) => (
                    <TableRow
                      key={row._id}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell align="center">{row.region}</TableCell>
                      <TableCell align="center">{row.count}</TableCell>

                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
          
          </Grid>


        </Grid>

        <Button onClick={seeDetails}>Click</Button>
        <Button onClick={chooseSelect}>Choose</Button>
        <Box sx={{ minWidth: 50 }}>
        <FormControl style={{ width: '50%' }}>
          <InputLabel id="demo-simple-select-label">Transporter</InputLabel>
          <Select
            labelId="transporter"
            id="transporter"
            value={selectedTran}
            label="Transporter"
            onChange={handleChange}
          >
            {tranList.map((name)=>(                        
              <MenuItem value={name}>{name}</MenuItem>                     
            ))}    
          </Select>
        </FormControl>

        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>  
          <TextField
              margin="normal"
              required
              style={{ width: '50%' }}
              name="quantity"
              label="Quantity"
              id="quantity"
              autoComplete="quantity"
            />
            {/* <Button onClick={confirmSelection}>Confirm</Button> */}
            <Button
              type="submit"
              
              style={{ width: '100px', margin:'25px'}}
              variant="contained"
              sx={{ mt: 3, mb: 3 }}
            >
              Submit
            </Button>
        </Box>
      </Box>
      
      {/* <Button onClick={getTable}>Submit</Button> */}


      </Container>
      


    </Page>
    
  );
}
