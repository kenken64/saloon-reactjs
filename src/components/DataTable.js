//import gql from 'graphql-tag'
import PropTypes from "prop-types";
import React, { Component, Fragment } from "react";
import { withApollo } from "react-apollo";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
//import Paper from '@material-ui/core/Paper';
//import TablePaginationActions from './TablePagination'
import TableFooter from "@material-ui/core/TableFooter";
import TablePagination from "@material-ui/core/TablePagination";
import DataTableToolbar from "./DataTableToolbar";
import Checkbox from "@material-ui/core/Checkbox";

/* eslint-enable */
const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto"
  },
  table: {
    minWidth: 700
  },
  tableCell: {
    paddingRight: 4,
    paddingLeft: 5
  },
  tableRow: {
    display: "flex",
    flexWrap: "wrap"
  }
});

class DataTable extends Component {
  state = {
    rows: [],
    page: 0,
    rowsPerPage: 15,
    activateScroll: "hidden",
    selected: []
  };

  componentWillUnmount() {
    window.removeEventListener("resize", this.resize);
  }

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  resize = () => {
    if (window.innerWidth <= 943) {
      this.setState({ activateScroll: "scroll" });
    } else {
      this.setState({ activateScroll: "hidden" });
    }
  };

  componentDidMount() {
    window.addEventListener("resize", this.resize);
  }

  handleSelectAllClick = event => {
    if (event.target.checked) {
      this.setState(state => ({ selected: state.rows.map(n => n.id) }));
      return;
    }
    this.setState({ selected: [] });
  };

  render() {
    const { classes, rows, header, columns } = this.props;
    const { rowsPerPage, page } = this.state;
    console.log(rows.length)
    //const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
    return (
      <div style={{ width: "auto", overflowX: this.state.activateScroll }}>
        { rows.length <= 0 ? (
          <Fragment></Fragment>
        ):(
          <DataTableToolbar numSelected={this.state.selected.length} />
        )}
        <Table className={classes.table}>
        { rows.length <= 0 ? (
          <Fragment></Fragment>
        ):(
          <TableHead>
            <TableRow className="classes.tableRow">
              <TableCell style={{ width: "10%" }}>
                <Checkbox
                  indeterminate={
                    this.state.selected.length > 0 &&
                    this.state.selected.length < rows.length
                  }
                  checked={this.state.selected.length === rows.length}
                  onChange={this.handleSelectAllClick}
                />
              </TableCell>
              {header}
            </TableRow>
          </TableHead>
        )}
          
          <TableBody>{columns}</TableBody>

          <TableFooter>
            <TableRow>
              {rows.length > 0 ? (
                <TablePagination
                  rowsPerPageOptions={[10, 25, 50]}
                  colSpan={4}
                  count={rows.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  backIconButtonProps={{
                    "aria-label": "Previous Page"
                  }}
                  nextIconButtonProps={{
                    "aria-label": "Next Page"
                  }}
                  onChangePage={this.handleChangePage}
                  onChangeRowsPerPage={this.handleChangeRowsPerPage}
                />
              ) : (
                <Fragment />
              )}
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    );
  }
}

DataTable.propTypes = {
  client: PropTypes.shape({
    mutate: PropTypes.func.isRequired
  }).isRequired
};

export default withApollo(withStyles(styles)(DataTable));
