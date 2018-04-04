import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import TextField from 'material-ui/TextField';
import axios from 'axios';
import Button from 'material-ui/Button';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';


var styles = {
    "blockStyle": {
        "padding": "20px",
        "marginLeft": "auto",
        "marginRight": "auto",
        "marginTop": "20px",
        }
}

class GetInfo extends React.Component{
    constructor(){
        super();
        this.state = {
            "email":["Enter patient e-mail"],
            "hr": ["Nothing yet"],
            "hr_times": ["Nothing yet"],
            "id": [],
        };
    }

    TypeInput = (event) => {
        console.log(this.email);
        this.setState({"email": event.target.value});
        }

    getData = () => {
        var URL = "http://vcm-3608.vm.duke.edu:5000/api/heart_rate/".concat(this.state.email)
        axios.get(URL).then( (response) => {
            console.log(response);
            console.log(response.status);
            var list = [];
            for (var i = 0; i <= (response.data["heart_rate"]).length-1; i++) {
                list.push(i);
            }
            this.setState({"hr": response.data["heart_rate"],
                           "hr_times": response.data["times"],
                            "id": list});
            console.log(this.state)
        })
    }

    onButtonClick = (event) => {
        console.log(this.state.email)
        this.getData()
    }

    render () {

        return(

            <div>
                <Paper style = {{"width":"600px", "margin": "auto"}} >
                <div style={styles.blockStyle}>
                <TextField id="email"
                          label="E-mail"
                          value={this.state.email}
                          onChange = {this.TypeInput}
                          color="secondary"

               />
                <Button variant="raised" onClick={this.onButtonClick}
                        style={{"float":"right"}}
                        color="secondary">
                    Get Data
                </Button>
                </div >
                </Paper>

                <div style={styles.blockStyle}>

                <Paper style = {{"width":"600px", "margin": "auto", "marginBottom":"50px"}} >
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell style={{"textAlign":"center"}}>Heart Rate (bpm)</TableCell>
                                <TableCell numeric style={{"textAlign":"center"}}>Time</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {(this.state.id).map(n => {
                                return (
                                    <TableRow key={n}>
                                        <TableCell numeric style={{"textAlign":"center"}}>{this.state.hr[n]}</TableCell>
                                        <TableCell numeric style={{"textAlign":"center"}}>{this.state.hr_times[n]}</TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </Paper>
                </div>

                <div>
                    <Paper style = {{"width":"600px", "margin": "auto"}}>
                        <LineChart width={550} height={300}
                                   data={(this.state.id).map(n => {
                                       return (
                                           {name: this.state.hr_times[n], value: this.state.hr[n]}
                                       );
                                   })}
                                   margin={{ top: 15, right: 5, bottom: 5, left: 5 }}>
                            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Line type="monotone" dataKey="value" stroke="#8884d8" activeDot={{r: 8}} />
                        </LineChart>
                        </Paper>
                    </div>


            </div>

            );
            }

    }
export default GetInfo;