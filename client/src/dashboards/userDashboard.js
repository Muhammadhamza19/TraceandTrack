import React,  { useEffect, useState } from "react";
import Button from '@mui/material/Button';
import Page from '../dashcomponents/Page';
import { useNavigate } from 'react-router-dom';
import jwt from 'jsonwebtoken'
import { Box, Grid, Container, Typography } from '@mui/material';
import AppWeeklySales from '../dashcomponents/AppWeeklySales';
import AppOrderTimeline from '../dashcomponents/AppOrderTimeline';
import getWeb3 from "../getWeb3";
import tracking from "../contracts/tracking.json";
import document from "../contracts/Transporter.json";


function UserDash(){
    const [RequestAid, setrequestAid] = useState('Not requested')
    const [reset, setReset] = useState(false)
    const navigate = useNavigate();
    const [account,setAccount]=useState('');
  const [contract,setContract]=useState(null);
  const [quantity,setQuantity]=useState('0');
  const [trackContract, settrackContract]=useState(null);
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
    useEffect(() => {
        console.log(localStorage.getItem("token"))
        loadContract();

	}, [])

    
    async function requestAid(event) {
        event.preventDefault()

        const req = await fetch('http://localhost:1337/api/requestregion', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': localStorage.getItem('token'),
            },
            body: JSON.stringify({
                
            }),
        })

        const data = await req.json()
        if (data.status === 'ok') {
            setrequestAid("Requested")
        } else {
            alert(data.error)
        }
    }

    const recevied =async ()=>{
            await trackContract.methods.reset().send({ from: account }).then((r)=>{}).catch(err=>console.log(err))
              setReset(true);
              const req = await fetch('http://localhost:1337/api/delete', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': localStorage.getItem('id'),
                },
                body: JSON.stringify({
                    _id: localStorage.getItem('id'),
                }),
            })
    }


    return <div>
        <Button onClick={requestAid}>Request Aid</Button>
   
        <h1>Hello user</h1>
        <h1>Your request: {RequestAid}</h1>
        <Page title="Dashboard | Minimal-UI">
            <Container maxWidth="xl">
                <Box sx={{ pb: 5 }}>
                <Typography variant="h4">Hi, Welcome back</Typography>
                </Box>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6} md={3}>
                            <AppWeeklySales />
                        </Grid>
                        <Grid item xs={12} md={6} lg={4}>
                            <AppOrderTimeline  reset={reset}/>
                        </Grid>
                    </Grid>
                    <Button onClick={recevied}>Received</Button>
            </Container>
        </Page>
    </div>
}
export default UserDash