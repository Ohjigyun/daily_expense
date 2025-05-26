import React, { useState, useEffect } from 'react'
import { ThemeProvider } from '@mui/material/styles'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Box, Paper, Input } from '@mui/material'
import { tableContainerSx, tableHeaderSx, tableSx, numberInputSx, qtyInputSx, numberSx, headTheme, bodyTheme, textAlignSx, smallTableContainerSx } from '../styles/tableStyles'
import{ useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Head from 'next/head'

export default function Home() {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'))
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const initialPositions = [
  '팀장님', '대리님', '대리님', '주임님', '주임님',
  '주임님', '사원님', '사원님', '인턴사원', '인턴사원'
  ];
  const initialWorkingDays = [
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
  ];
  const initialEtc = [
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
  ];
  const initialTotal = [
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
  ];

  const positionOptions = [
    '팀장님', '대리님', '주임님', '사원님', '인턴사원'
  ];

  const [position, setPosition] = useState<string[]>(initialPositions);
  const [workingDays, setWorkingDays] = useState<number[]>(initialWorkingDays)
  const [etc, setEtc] = useState<number[]>(initialEtc)
  const [total, setTotal] = useState<number[]>(initialTotal)
  const [sumTotal, setSumTotal] = useState<number>(0);

  const positionChangeHandler = (index: number) => (event: SelectChangeEvent) => {
    const newPositions = [...position];
    newPositions[index] = event.target.value;
    setPosition(newPositions);
  };

  const workingDaysChangeHandler = (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const newWorkingDays = [...workingDays];
    newWorkingDays[index] = value === '' ? 0 : Number(value);
    setWorkingDays(newWorkingDays);
  }

  const etcChangeHandler = (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const newEtc = [...etc];
    newEtc[index] = value === '' ? 0 : Number(value);
    setEtc(newEtc);
  }

  const totalChangeHandler = (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const newTotal = [...total];
    newTotal[index] = value === '' ? 0 : Number(value);
    setTotal(newTotal);
  }

useEffect(() => {
  const newTotal = workingDays.map((days, idx) => {
    const isTeamLeader = position[idx] === '팀장님';
    const payPerDay = isTeamLeader ? 44000 : 31000;
    return days * payPerDay + etc[idx];
  });
  setTotal(newTotal);
}, [workingDays, etc, position]);

useEffect(() => {
  const sum = total.reduce((acc, cur) => acc + cur, 0);
  setSumTotal(sum);
}, [total]);

  // const itemCostPriceChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setItemCostPrice(parseInt(e.target.value))
  // }
  
  // const itemSalePriceChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setItemSalePrice(parseInt(e.target.value))
  // }

  // const competitorsChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setCompetitors(e.target.value)
  // }

  // const competitorsCostPriceChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setCompetitorsCostPrice(parseInt(e.target.value))
  // }
  
  // const competitorsSalePriceChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setCompetitorsSalePrice(parseInt(e.target.value))
  // }

  // const qtyChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setQty(parseInt(e.target.value))
  // }

  return (
    <div>
      <Head>
        <title>Daily Expense</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <TableContainer sx={tableContainerSx} component={Paper}>
        <Table sx={tableSx} aria-label="spanning table">
          <ThemeProvider theme={headTheme}>
            <TableHead sx={tableHeaderSx}>
              <TableRow>
                <TableCell sx={textAlignSx} colSpan={4}>일비 계산기</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={textAlignSx}>이름</TableCell>
                <TableCell sx={textAlignSx}>금액</TableCell>
                <TableCell sx={textAlignSx}>이름</TableCell>
                <TableCell sx={textAlignSx}>금액</TableCell>
              </TableRow>
            </TableHead>
          </ThemeProvider>
          <ThemeProvider theme={bodyTheme}>
            <TableBody>
              <TableRow>
                <TableCell sx={{textAlign: 'center', display: 'flex', justifyContent : 'center', height: '6rem', alignItems: 'center' }}>
                    <Input 
                      sx={
                          { fontSize: isDesktop ? '16px' : '10px', maxWidth: isDesktop ? '6rem' : '3rem',
                            marginRight : isDesktop ? '5px' : '2px'}
                        }
                      placeholder='이름'
                      ></Input>
                    <FormControl>
                      <InputLabel id="demo-simple-select-label">직급</InputLabel>
                        
                      <Select
                        sx={{ fontSize: isDesktop ? '13px' : '9px', minWidth: isDesktop ? '6rem' : '2.5rem' }}
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={position[0]}
                        label="Position"
                        onChange={positionChangeHandler(0)}
                      >
                        {positionOptions.map((pos, idx) => (
                          <MenuItem key={idx} value={pos}>{pos}</MenuItem>))}
                      </Select>
                    </FormControl>
                </TableCell>
                <TableCell sx={{ height: '6rem' , textAlign: 'center'}}>
                  <Box>
                    근무일 수: 
                    <Input sx={
                      { fontSize: isDesktop ? '16px' : '10px', maxWidth: isDesktop ? '1.5rem' : '0.8rem',
                        marginLeft : isDesktop ? '5px' : '2px'
                      }
                      }
                      value={workingDays[0]} onChange={workingDaysChangeHandler(0)}>
                    </Input>일
                  </Box>
                  <Box>
                    기타 금액: 
                    <Input sx={
                      { fontSize: isDesktop ? '16px' : '10px', maxWidth: isDesktop ? '6rem' : '3rem',
                        marginLeft : isDesktop ? '5px' : '2px'
                      }
                      }
                      value={etc[0]} onChange={etcChangeHandler(0)}>
                    </Input>원
                  </Box>
                  <Box sx={{ fontSize: isDesktop ? '16px' : '10px', marginTop: isDesktop ? '5px' : '2px' ,marginLeft : isDesktop ? '5px' : '2px' }}>
                    총 금액: {total[0]}원
                  </Box>
                </TableCell>
                <TableCell sx={{textAlign: 'center', display: 'flex', justifyContent : 'center', height: '6rem', alignItems: 'center' }}>
                    <Input 
                      sx={
                          { fontSize: isDesktop ? '16px' : '10px', maxWidth: isDesktop ? '6rem' : '3rem',
                            marginRight : isDesktop ? '5px' : '2px'}
                        }
                      placeholder='이름'
                      ></Input>
                    <FormControl>
                      <InputLabel id="demo-simple-select-label">직급</InputLabel>
                        
                      <Select
                        sx={{ fontSize: isDesktop ? '13px' : '9px', minWidth: isDesktop ? '6rem' : '2.5rem' }}
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={position[1]}
                        label="Position"
                        onChange={positionChangeHandler((1))}
                      >
                        {positionOptions.map((pos, idx) => (
                          <MenuItem key={idx} value={pos}>{pos}</MenuItem>))}
                      </Select>
                    </FormControl>
                </TableCell>
                <TableCell sx={{ height: '6rem' , textAlign: 'center'}}>
                  <Box>
                    근무일 수: 
                    <Input sx={
                      { fontSize: isDesktop ? '16px' : '10px', maxWidth: isDesktop ? '1.5rem' : '0.8rem',
                        marginLeft : isDesktop ? '5px' : '2px'
                      }
                      }
                      value={workingDays[1]} onChange={workingDaysChangeHandler((1))}>
                    </Input>일
                  </Box>
                  <Box>
                    기타 금액: 
                    <Input sx={
                      { fontSize: isDesktop ? '16px' : '10px', maxWidth: isDesktop ? '6rem' : '3rem',
                        marginLeft : isDesktop ? '5px' : '2px'
                      }
                      }
                      value={etc[1]} onChange={etcChangeHandler((1))}>
                    </Input>원
                  </Box>
                  <Box sx={{ fontSize: isDesktop ? '16px' : '10px', marginTop: isDesktop ? '5px' : '2px' ,marginLeft : isDesktop ? '5px' : '2px' }}>
                    총 금액: {total[1]}원
                  </Box>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{textAlign: 'center', display: 'flex', justifyContent : 'center', height: '6rem', alignItems: 'center' }}>
                    <Input 
                      sx={
                          { fontSize: isDesktop ? '16px' : '10px', maxWidth: isDesktop ? '6rem' : '3rem',
                            marginRight : isDesktop ? '5px' : '2px'}
                        }
                      placeholder='이름'
                      ></Input>
                    <FormControl>
                      <InputLabel id="demo-simple-select-label">직급</InputLabel>
                        
                      <Select
                        sx={{ fontSize: isDesktop ? '13px' : '9px', minWidth: isDesktop ? '6rem' : '2.5rem' }}
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={position[2]}
                        label="Position"
                        onChange={positionChangeHandler(2)}
                      >
                        {positionOptions.map((pos, idx) => (
                          <MenuItem key={idx} value={pos}>{pos}</MenuItem>))}
                      </Select>
                    </FormControl>
                </TableCell>
                <TableCell sx={{ height: '6rem' , textAlign: 'center'}}>
                  <Box>
                    근무일 수: 
                    <Input sx={
                      { fontSize: isDesktop ? '16px' : '10px', maxWidth: isDesktop ? '1.5rem' : '0.8rem',
                        marginLeft : isDesktop ? '5px' : '2px'
                      }
                      }
                      value={workingDays[2]} onChange={workingDaysChangeHandler(2)}>
                    </Input>일
                  </Box>
                  <Box>
                    기타 금액: 
                    <Input sx={
                      { fontSize: isDesktop ? '16px' : '10px', maxWidth: isDesktop ? '6rem' : '3rem',
                        marginLeft : isDesktop ? '5px' : '2px'
                      }
                      }
                      value={etc[2]} onChange={etcChangeHandler(2)}>
                    </Input>원
                  </Box>
                  <Box sx={{ fontSize: isDesktop ? '16px' : '10px', marginTop: isDesktop ? '5px' : '2px' ,marginLeft : isDesktop ? '5px' : '2px' }}>
                    총 금액: {total[2]}원
                  </Box>
                </TableCell>
                <TableCell sx={{textAlign: 'center', display: 'flex', justifyContent : 'center', height: '6rem', alignItems: 'center' }}>
                    <Input 
                      sx={
                          { fontSize: isDesktop ? '16px' : '10px', maxWidth: isDesktop ? '6rem' : '3rem',
                            marginRight : isDesktop ? '5px' : '2px'}
                        }
                      placeholder='이름'
                      ></Input>
                    <FormControl>
                      <InputLabel id="demo-simple-select-label">직급</InputLabel>
                        
                      <Select
                        sx={{ fontSize: isDesktop ? '13px' : '9px', minWidth: isDesktop ? '6rem' : '2.5rem' }}
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={position[3]}
                        label="Position"
                        onChange={positionChangeHandler((3))}
                      >
                        {positionOptions.map((pos, idx) => (
                          <MenuItem key={idx} value={pos}>{pos}</MenuItem>))}
                      </Select>
                    </FormControl>
                </TableCell>
                <TableCell sx={{ height: '6rem' , textAlign: 'center'}}>
                  <Box>
                    근무일 수: 
                    <Input sx={
                      { fontSize: isDesktop ? '16px' : '10px', maxWidth: isDesktop ? '1.5rem' : '0.8rem',
                        marginLeft : isDesktop ? '5px' : '2px'
                      }
                      }
                      value={workingDays[3]} onChange={workingDaysChangeHandler((3))}>
                    </Input>일
                  </Box>
                  <Box>
                    기타 금액: 
                    <Input sx={
                      { fontSize: isDesktop ? '16px' : '10px', maxWidth: isDesktop ? '6rem' : '3rem',
                        marginLeft : isDesktop ? '5px' : '2px'
                      }
                      }
                      value={etc[3]} onChange={etcChangeHandler((3))}>
                    </Input>원
                  </Box>
                  <Box sx={{ fontSize: isDesktop ? '16px' : '10px', marginTop: isDesktop ? '5px' : '2px' ,marginLeft : isDesktop ? '5px' : '2px' }}>
                    총 금액: {total[3]}원
                  </Box>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{textAlign: 'center', display: 'flex', justifyContent : 'center', height: '6rem', alignItems: 'center' }}>
                    <Input 
                      sx={
                          { fontSize: isDesktop ? '16px' : '10px', maxWidth: isDesktop ? '6rem' : '3rem',
                            marginRight : isDesktop ? '5px' : '2px'}
                        }
                      placeholder='이름'
                      ></Input>
                    <FormControl>
                      <InputLabel id="demo-simple-select-label">직급</InputLabel>
                        
                      <Select
                        sx={{ fontSize: isDesktop ? '13px' : '9px', minWidth: isDesktop ? '6rem' : '2.5rem' }}
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={position[4]}
                        label="Position"
                        onChange={positionChangeHandler(4)}
                      >
                        {positionOptions.map((pos, idx) => (
                          <MenuItem key={idx} value={pos}>{pos}</MenuItem>))}
                      </Select>
                    </FormControl>
                </TableCell>
                <TableCell sx={{ height: '6rem' , textAlign: 'center'}}>
                  <Box>
                    근무일 수: 
                    <Input sx={
                      { fontSize: isDesktop ? '16px' : '10px', maxWidth: isDesktop ? '1.5rem' : '0.8rem',
                        marginLeft : isDesktop ? '5px' : '2px'
                      }
                      }
                      value={workingDays[4]} onChange={workingDaysChangeHandler(4)}>
                    </Input>일
                  </Box>
                  <Box>
                    기타 금액: 
                    <Input sx={
                      { fontSize: isDesktop ? '16px' : '10px', maxWidth: isDesktop ? '6rem' : '3rem',
                        marginLeft : isDesktop ? '5px' : '2px'
                      }
                      }
                      value={etc[4]} onChange={etcChangeHandler(4)}>
                    </Input>원
                  </Box>
                  <Box sx={{ fontSize: isDesktop ? '16px' : '10px', marginTop: isDesktop ? '5px' : '2px' ,marginLeft : isDesktop ? '5px' : '2px' }}>
                    총 금액: {total[4]}원
                  </Box>
                </TableCell>
                <TableCell sx={{textAlign: 'center', display: 'flex', justifyContent : 'center', height: '6rem', alignItems: 'center' }}>
                    <Input 
                      sx={
                          { fontSize: isDesktop ? '16px' : '10px', maxWidth: isDesktop ? '6rem' : '3rem',
                            marginRight : isDesktop ? '5px' : '2px'}
                        }
                      placeholder='이름'
                      ></Input>
                    <FormControl>
                      <InputLabel id="demo-simple-select-label">직급</InputLabel>
                        
                      <Select
                        sx={{ fontSize: isDesktop ? '13px' : '9px', minWidth: isDesktop ? '6rem' : '2.5rem' }}
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={position[5]}
                        label="Position"
                        onChange={positionChangeHandler((5))}
                      >
                        {positionOptions.map((pos, idx) => (
                          <MenuItem key={idx} value={pos}>{pos}</MenuItem>))}
                      </Select>
                    </FormControl>
                </TableCell>
                <TableCell sx={{ height: '6rem' , textAlign: 'center'}}>
                  <Box>
                    근무일 수: 
                    <Input sx={
                      { fontSize: isDesktop ? '16px' : '10px', maxWidth: isDesktop ? '1.5rem' : '0.8rem',
                        marginLeft : isDesktop ? '5px' : '2px'
                      }
                      }
                      value={workingDays[5]} onChange={workingDaysChangeHandler((5))}>
                    </Input>일
                  </Box>
                  <Box>
                    기타 금액: 
                    <Input sx={
                      { fontSize: isDesktop ? '16px' : '10px', maxWidth: isDesktop ? '6rem' : '3rem',
                        marginLeft : isDesktop ? '5px' : '2px'
                      }
                      }
                      value={etc[5]} onChange={etcChangeHandler((5))}>
                    </Input>원
                  </Box>
                  <Box sx={{ fontSize: isDesktop ? '16px' : '10px', marginTop: isDesktop ? '5px' : '2px' ,marginLeft : isDesktop ? '5px' : '2px' }}>
                    총 금액: {total[5]}원
                  </Box>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{textAlign: 'center', display: 'flex', justifyContent : 'center', height: '6rem', alignItems: 'center' }}>
                    <Input 
                      sx={
                          { fontSize: isDesktop ? '16px' : '10px', maxWidth: isDesktop ? '6rem' : '3rem',
                            marginRight : isDesktop ? '5px' : '2px'}
                        }
                      placeholder='이름'
                      ></Input>
                    <FormControl>
                      <InputLabel id="demo-simple-select-label">직급</InputLabel>
                        
                      <Select
                        sx={{ fontSize: isDesktop ? '13px' : '9px', minWidth: isDesktop ? '6rem' : '2.5rem' }}
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={position[6]}
                        label="Position"
                        onChange={positionChangeHandler(6)}
                      >
                        {positionOptions.map((pos, idx) => (
                          <MenuItem key={idx} value={pos}>{pos}</MenuItem>))}
                      </Select>
                    </FormControl>
                </TableCell>
                <TableCell sx={{ height: '6rem' , textAlign: 'center'}}>
                  <Box>
                    근무일 수: 
                    <Input sx={
                      { fontSize: isDesktop ? '16px' : '10px', maxWidth: isDesktop ? '1.5rem' : '0.8rem',
                        marginLeft : isDesktop ? '5px' : '2px'
                      }
                      }
                      value={workingDays[6]} onChange={workingDaysChangeHandler(6)}>
                    </Input>일
                  </Box>
                  <Box>
                    기타 금액: 
                    <Input sx={
                      { fontSize: isDesktop ? '16px' : '10px', maxWidth: isDesktop ? '6rem' : '3rem',
                        marginLeft : isDesktop ? '5px' : '2px'
                      }
                      }
                      value={etc[6]} onChange={etcChangeHandler(6)}>
                    </Input>원
                  </Box>
                  <Box sx={{ fontSize: isDesktop ? '16px' : '10px', marginTop: isDesktop ? '5px' : '2px' ,marginLeft : isDesktop ? '5px' : '2px' }}>
                    총 금액: {total[6]}원
                  </Box>
                </TableCell>
                <TableCell sx={{textAlign: 'center', display: 'flex', justifyContent : 'center', height: '6rem', alignItems: 'center' }}>
                    <Input 
                      sx={
                          { fontSize: isDesktop ? '16px' : '10px', maxWidth: isDesktop ? '6rem' : '3rem',
                            marginRight : isDesktop ? '5px' : '2px'}
                        }
                      placeholder='이름'
                      ></Input>
                    <FormControl>
                      <InputLabel id="demo-simple-select-label">직급</InputLabel>
                        
                      <Select
                        sx={{ fontSize: isDesktop ? '13px' : '9px', minWidth: isDesktop ? '6rem' : '2.5rem' }}
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={position[7]}
                        label="Position"
                        onChange={positionChangeHandler((7))}
                      >
                        {positionOptions.map((pos, idx) => (
                          <MenuItem key={idx} value={pos}>{pos}</MenuItem>))}
                      </Select>
                    </FormControl>
                </TableCell>
                <TableCell sx={{ height: '6rem' , textAlign: 'center'}}>
                  <Box>
                    근무일 수: 
                    <Input sx={
                      { fontSize: isDesktop ? '16px' : '10px', maxWidth: isDesktop ? '1.5rem' : '0.8rem',
                        marginLeft : isDesktop ? '5px' : '2px'
                      }
                      }
                      value={workingDays[7]} onChange={workingDaysChangeHandler((7))}>
                    </Input>일
                  </Box>
                  <Box>
                    기타 금액: 
                    <Input sx={
                      { fontSize: isDesktop ? '16px' : '10px', maxWidth: isDesktop ? '6rem' : '3rem',
                        marginLeft : isDesktop ? '5px' : '2px'
                      }
                      }
                      value={etc[7]} onChange={etcChangeHandler((7))}>
                    </Input>원
                  </Box>
                  <Box sx={{ fontSize: isDesktop ? '16px' : '10px', marginTop: isDesktop ? '5px' : '2px' ,marginLeft : isDesktop ? '5px' : '2px' }}>
                    총 금액: {total[7]}원
                  </Box>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{textAlign: 'center', display: 'flex', justifyContent : 'center', height: '6rem', alignItems: 'center' }}>
                    <Input 
                      sx={
                          { fontSize: isDesktop ? '16px' : '10px', maxWidth: isDesktop ? '6rem' : '3rem',
                            marginRight : isDesktop ? '5px' : '2px'}
                        }
                      placeholder='이름'
                      ></Input>
                    <FormControl>
                      <InputLabel id="demo-simple-select-label">직급</InputLabel>
                        
                      <Select
                        sx={{ fontSize: isDesktop ? '13px' : '9px', minWidth: isDesktop ? '6rem' : '2.5rem' }}
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={position[8]}
                        label="Position"
                        onChange={positionChangeHandler(8)}
                      >
                        {positionOptions.map((pos, idx) => (
                          <MenuItem key={idx} value={pos}>{pos}</MenuItem>))}
                      </Select>
                    </FormControl>
                </TableCell>
                <TableCell sx={{ height: '6rem' , textAlign: 'center'}}>
                  <Box>
                    근무일 수: 
                    <Input sx={
                      { fontSize: isDesktop ? '16px' : '10px', maxWidth: isDesktop ? '1.5rem' : '0.8rem',
                        marginLeft : isDesktop ? '5px' : '2px'
                      }
                      }
                      value={workingDays[8]} onChange={workingDaysChangeHandler(8)}>
                    </Input>일
                  </Box>
                  <Box>
                    기타 금액: 
                    <Input sx={
                      { fontSize: isDesktop ? '16px' : '10px', maxWidth: isDesktop ? '6rem' : '3rem',
                        marginLeft : isDesktop ? '5px' : '2px'
                      }
                      }
                      value={etc[8]} onChange={etcChangeHandler(8)}>
                    </Input>원
                  </Box>
                  <Box sx={{ fontSize: isDesktop ? '16px' : '10px', marginTop: isDesktop ? '5px' : '2px' ,marginLeft : isDesktop ? '5px' : '2px' }}>
                    총 금액: {total[8]}원
                  </Box>
                </TableCell>
                <TableCell sx={{textAlign: 'center', display: 'flex', justifyContent : 'center', height: '6rem', alignItems: 'center' }}>
                    <Input 
                      sx={
                          { fontSize: isDesktop ? '16px' : '10px', maxWidth: isDesktop ? '6rem' : '3rem',
                            marginRight : isDesktop ? '5px' : '2px'}
                        }
                      placeholder='이름'
                      ></Input>
                    <FormControl>
                      <InputLabel id="demo-simple-select-label">직급</InputLabel>
                        
                      <Select
                        sx={{ fontSize: isDesktop ? '13px' : '9px', minWidth: isDesktop ? '6rem' : '2.5rem' }}
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={position[9]}
                        label="Position"
                        onChange={positionChangeHandler((9))}
                      >
                        {positionOptions.map((pos, idx) => (
                          <MenuItem key={idx} value={pos}>{pos}</MenuItem>))}
                      </Select>
                    </FormControl>
                </TableCell>
                <TableCell sx={{ height: '6rem' , textAlign: 'center'}}>
                  <Box>
                    근무일 수: 
                    <Input sx={
                      { fontSize: isDesktop ? '16px' : '10px', maxWidth: isDesktop ? '1.5rem' : '0.8rem',
                        marginLeft : isDesktop ? '5px' : '2px'
                      }
                      }
                      value={workingDays[9]} onChange={workingDaysChangeHandler((9))}>
                    </Input>일
                  </Box>
                  <Box>
                    기타 금액: 
                    <Input sx={
                      { fontSize: isDesktop ? '16px' : '10px', maxWidth: isDesktop ? '6rem' : '3rem',
                        marginLeft : isDesktop ? '5px' : '2px'
                      }
                      }
                      value={etc[9]} onChange={etcChangeHandler((9))}>
                    </Input>원
                  </Box>
                  <Box sx={{ fontSize: isDesktop ? '16px' : '10px', marginTop: isDesktop ? '5px' : '2px' ,marginLeft : isDesktop ? '5px' : '2px' }}>
                    총 금액: {total[9]}원
                  </Box>
                </TableCell>
              </TableRow>
            </TableBody>
          </ThemeProvider>
        </Table>
      </TableContainer>
      <TableContainer sx={smallTableContainerSx} component={Paper}>
        <Table sx={tableSx} aria-label="spanning table">
          <ThemeProvider theme={headTheme}>
            <TableHead sx={tableHeaderSx}>
              <TableRow>
                <TableCell sx={{ textAlign: 'center', fontSize: isDesktop ? '20px' : '12px'}} colSpan={2}>일비 총 금액:</TableCell>
                <TableCell sx={{ textAlign: 'center', fontSize: isDesktop ? '20px' : '12px'}} colSpan={2}>{sumTotal.toLocaleString()} 원</TableCell>
              </TableRow>
            </TableHead>
          </ThemeProvider>
        </Table>
      </TableContainer>
    </div>
  )
}
