import React,{useState,useEffect} from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import { visuallyHidden } from '@mui/utils';
import HeaderButton from './headerButton';
import axios from 'axios';
import './table.css'

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: 'sl_no',
    numeric: false,
    disablePadding: true,
    label: 'Sl no',
  },
  {
    id: 'business_code',
    numeric: true,
    disablePadding: false,
    label: 'Business Code',
  },
  {
    id: 'cust_number',
    numeric: true,
    disablePadding: false,
    label: 'Customer Number',
  },
  {
    id: 'clear_date',
    numeric: true,
    disablePadding: false,
    label: 'Clear Date',
  },
  {
    id: 'buisness_year',
    numeric: true,
    disablePadding: false,
    label: 'Business Year',
  },
  {
    id: 'doc_id',
    numeric: true,
    disablePadding: false,
    label: 'Document Id',
  },
  {
    id: 'posting_date',
    numeric: true,
    disablePadding: false,
    label: 'Posting Date',
  },
  {
    id: 'document_create_date',
    numeric: true,
    disablePadding: false,
    label: 'Document Create Date',
  },
  {
    id: 'due_in_date',
    numeric: true,
    disablePadding: false,
    label: 'Due Date',
  },
  {
    id: 'invoice_currency',
    numeric: true,
    disablePadding: false,
    label: 'Invoice Currency',
  },
  {
    id: 'document_type',
    numeric: true,
    disablePadding: false,
    label: 'Document Type',
  },
  {
    id: 'posting_id',
    numeric: true,
    disablePadding: false,
    label: 'Posting Id',
  },
  {
    id: 'total_open_amount',
    numeric: true,
    disablePadding: false,
    label: 'Total Open amount',
  },
  {
    id: 'baseline_create_date',
    numeric: true,
    disablePadding: false,
    label: 'Baseline Create Date',
  },
  {
    id: 'cust_payment_terms',
    numeric: true,
    disablePadding: false,
    label: 'Customer Payment Terms',
  },
  {
    id: 'invoice_id',
    numeric: true,
    disablePadding: false,
    label: 'Invoice Id',
  },
  {
    id: 'aging_bucket',
    numeric: true,
    disablePadding: false,
    label: 'Aging Bucket',
  },
  
];

function EnhancedTableHead(props) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
    props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts',
            }}
            sx={{color:'white'}}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
            sx={{color:'white',padding:'25px'}}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

export default function EnhancedTable() {
  const [rows,createData]=useState([]);
  useEffect(() => {
    axios.get('http://localhost:8080/invoice-management/getData')
    .then(resp=>{
      console.log(resp.data)
      createData(resp.data)})
    },[])
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.sl_no);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, doc_id) => {
    const selectedIndex = selected.indexOf(doc_id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, doc_id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const isSelected = (doc_id) => selected.indexOf(doc_id) !== -1;
 
  return (
    <>
    
    <HeaderButton selected={selected} createData={createData}/>
    
    <Box sx={{ width: '100%' }} >
      <Paper sx={{ width: '100%' }} >
        <TableContainer className='table'>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            
            <TableBody>
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.doc_id);
                  console.log(selected);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.doc_id)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.sl_no}
                      selected={isItemSelected}
                      className='light'
                      
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{
                            'aria-labelledby': labelId,
                            
                          }}
                          sx={{color:'white'}}
                        />
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                        sx={{color:'white'}}
                      >
                        {row.sl_no}
                      </TableCell>
                      
                      <TableCell align="right" sx={{color:'white'}} >{row.business_code}</TableCell>
                      <TableCell align="right" sx={{color:'white'}}>{row.cust_number}</TableCell>
                      <TableCell align="right" sx={{color:'white'}}>{row.clear_date}</TableCell>
                      <TableCell align="right" sx={{color:'white'}}>{row.business_year}</TableCell>
                      <TableCell align="right" sx={{color:'white'}}>{row.doc_id}</TableCell>
                      <TableCell align="right" sx={{color:'white'}}>{row.posting_date}</TableCell>
                      <TableCell align="right" sx={{color:'white'}}>{row.document_create_date}</TableCell>
                      <TableCell align="right" sx={{color:'white'}}>{row.due_in_date}</TableCell>
                      <TableCell align="right" sx={{color:'white'}}>{row.invoice_currency}</TableCell>
                      <TableCell align="right" sx={{color:'white'}}>{row.document_type}</TableCell>
                      <TableCell align="right" sx={{color:'white'}}>{row.posting_id}</TableCell>
                      <TableCell align="right" sx={{color:'white'}}>{row.total_open_amount}</TableCell>
                      <TableCell align="right" sx={{color:'white'}}>{row.baseline_create_date}</TableCell>
                      <TableCell align="right" sx={{color:'white'}}>{row.cust_payment_terms}</TableCell>
                      <TableCell align="right" sx={{color:'white'}}>{row.invoice_id}</TableCell>
                      <TableCell align="right" sx={{color:'white'}}>{row.aging_bucket===null?"NULL":row.aging_bucket}</TableCell>
                    </TableRow>
                  );
                })}
              
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          className='table'
          sx={{color:'white'}}
        />
      </Paper>
      
    </Box>
    </>
  );
}
