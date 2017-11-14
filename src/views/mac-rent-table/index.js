import React, { Component } from "react";
import { FormGroup, Table, FormControl, InputGroup, Grid, Col, Row, Checkbox, Image, Modal } from "react-bootstrap";
import changeCase from "change-case";
import GoogleLogout from "react-google-login";
import moment from "moment";
import { PropTypes } from "prop-types";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import logo from "../../assets/images/mondora.png";
import showMoreIcon from "../../assets/images/showMore.png";
import addIcon from "../../assets/images/addDocIcon.png";

import { fetchRentInfo } from "../../actions/elements";
import { deleteElement } from "../../actions/elements";

import MacRentInfoRow from "../../components/mac-rent-info-row";
import SimpleModal from "../../components/simpleModal";

import Button from "antd/lib/button";
import _ from "lodash";


class MacRentTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nameChecked: false,
            codeChecked: false,
            dateFromChecked: true,
            dateToChecked: true,
            serialChecked: true,
            ownerChecked: true,
            feeChecked: false,
            lastModChecked: false,
            showCheckColumns: false,
            showFetchErrorModal: false,
            showDeleteErrorModal: false,
            macRentInformations: [],
            filterTerm: "",
            userName: "",
        }
    };

    static propTypes = {
        match: PropTypes.object,
        elements: PropTypes.array,
        fetchRentInfo: PropTypes.func.isRequired,
        fetchError: PropTypes.bool,
        deleteError: PropTypes.bool
    };


    componentDidMount() {
        const { fetchRentInfo } = this.props;

        if (fetchRentInfo) {
            fetchRentInfo();
        }

    }


    componentWillReceiveProps(nextProps) {
        if (this.props.elements !== nextProps.elemenets) {
            this.setState({
                macRentInformations: nextProps.elements
            });
        }

        if (this.props.fetchError !== nextProps.fetchError) { 
            this.setState({
                showFetchErrorModal: true
            });
        }


        if (this.props.deleteError !== nextProps.deleteError) {
            this.setState({
                showDeleteErrorModal: true
            });
        }


    }

    deleteMacRentInformation(iden) {

        const { deleteElement } = this.props;

        if (deleteElement) {
            deleteElement(iden);
        }

        if (this.props.deleteError) {
            this.setState({ showDeleteErrorModal: true });
        }

    }


    showCheck(){
        this.setState({showCheckColumns: true});
    }



    logout(response) {
        localStorage.setItem("googleAccessToken", "no-token");
        localStorage.setItem("userName", "loggedOutUser");
        console.log(response);
        window.location = "/";
    }

    handleOrderDownButtonPress(parameter, macRentInformations) {
        this.setState({ macRentInformations: _.sortBy(this.state.macRentInformations, [parameter, "code"]) });
    }
    handleOrderUpButtonPress(parameter, macRentInformations) {
        this.setState({ macRentInformations: _.sortBy(this.state.macRentInformations, [parameter, "code"]).reverse() });
    }

    filterValues(macRentInformations, filterTerm) {
        var filterTermLowerCase = changeCase.lowerCase(filterTerm);
        return ((changeCase.lowerCase(macRentInformations.name).includes(filterTermLowerCase) && this.state.nameChecked) ||
            (changeCase.lowerCase(macRentInformations.code).includes(filterTermLowerCase) && this.state.codeChecked) ||
            (changeCase.lowerCase(macRentInformations.dateFrom).includes(filterTermLowerCase) && this.state.dateFromChecked) ||
            (changeCase.lowerCase(macRentInformations.dateTo).includes(filterTermLowerCase) && this.state.dateToChecked) ||
            (changeCase.lowerCase(macRentInformations.serial).includes(filterTermLowerCase) && this.state.serialChecked) ||
            (changeCase.lowerCase(macRentInformations.owner).includes(filterTermLowerCase) && this.state.ownerChecked) ||
            (changeCase.lowerCase(macRentInformations.lastMod).includes(filterTermLowerCase) && this.state.lastModChecked) ||
            (String(macRentInformations.fee).includes(filterTerm) && this.state.feeChecked)
        );
    }


    closeFetchErrorModal() { 
        this.setState({showFetchErrorModal: false});
    }

    closeDeleteErrorModal() {
        this.setState({ showDeleteErrorModal: false });
    }




    renderFetchErrorModal() {
        
        return (<SimpleModal show={this.state.showFetchErrorModal} close={this.closeFetchErrorModal.bind(this)} title="Recupero dati fallito"/>);


    }


    renderDeleteErrorModal() {


        return (<SimpleModal show={this.state.showDeleteErrorModal} close={this.closeDeleteErrorModal.bind(this)} title="Cancellazione elemento fallito" />);
        
    }

    render() {
        return (
            <Grid fluid={true} style={{ marginTop: 20, margin: 0 }}>
                {console.log(this.props)}
                {this.renderFetchErrorModal()}
                {this.renderDeleteErrorModal()}
                <Row className="show-grid" >
                    <Col lg={3} sm={6} xs={6} style={{ marginTop: 15, marginLeft: 30 }}>
                        <Image src={logo} bsSize="small" rounded/>
                    </Col>
                    <Col lg={5} xs={0}>
                        <h1 id="tableTitle" className="title">
                        Tabella affitto MacBook
                        </h1>
                    </Col>
                    <Col lg={3} sm={6} xs={5} id="logoutCol" >
                        <div className="floatRight">
                            <div style={{ right: "0px", margin: "40px" }}>
                                <GoogleLogout
                                    id="logoutButton"    
                                    clientId="524088644940-rlsefunif94pvmlhla81d71vcogtvdiq.apps.googleusercontent.com"
                                    buttonText="Logout"
                                    onLogoutSuccess={(res) => console.log(res)}
                                    onSuccess={this.logout} />
                            </div>
                        </div>
                    </Col>
                </Row>
                <hr></hr>
                <Row>
                    <Col lg={0} xs={12}>
                        <center>
                            <h3 id="mobileTableTitle" className="title" >
                                Tabella affitto MacBook
                            </h3>
                        </center>
                    </Col>
                </Row>    
                <Row style={{ marginTop: 20, marginBottom: 30 }}>
                    <Col lgOffset={1} lg={4} sm={3} xs={12} style={{ margin: 20 }}>
                        <InputGroup style={{ width: 340}}>
                            <FormControl
                                    id="filter"
                                    onChange={e => this.setState({ filterTerm: e.target.value })}
                                    placeholder="search"
                                    value={this.state.filterTerm}
                                    type="text"
                                />
                        </InputGroup>   
                    </Col>
                    <Col lg={7} sm={6} xs={12}  id="checkCol">
                        <Col lg={4} xs={6}><Image hidden={this.state.showCheckColumns} id="showMoreIcon" src={showMoreIcon} onClick={this.showCheck.bind(this)} title={"Clicca per mostrare altri dettagli"} /> </Col>
                        <Col lg={3} xs={5} xsOffset={1}><Image id="addDocIcon" src={addIcon} onClick={() => this.props.history.push(`/input/`)} title={"Clicca per aggiungere i tuoi dati"}/></Col>
                        <FormGroup id="checkGroup" hidden={!this.state.showCheckColumns} >
                                <Checkbox onClick={() => this.setState({ ownerChecked: !this.state.ownerChecked })} defaultChecked inline>
                                    {"Possessore"}
                                </Checkbox>
                                <Checkbox  onClick={() => this.setState({ serialChecked: !this.state.serialChecked })} defaultChecked inline>
                                    {"N°serie"}
                                </Checkbox>
                                <Checkbox onClick={() => this.setState({ dateFromChecked: !this.state.dateFromChecked })} defaultChecked inline>
                                    {"Inizio"}
                                </Checkbox>
                                <Checkbox onClick={() => this.setState({ dateToChecked: !this.state.dateToChecked })} defaultChecked inline>
                                    {"Termine"}
                                    </Checkbox>
                                <Checkbox onClick={() => this.setState({ nameChecked: !this.state.nameChecked })}  inline>
                                    {"Nome mac"}
                                </Checkbox>
                                <Checkbox onClick={() => this.setState({ codeChecked: !this.state.codeChecked })}  inline>
                                    {"Codice affitto"}
                                </Checkbox>
                                <Checkbox onClick={() => this.setState({ feeChecked: !this.state.feeChecked })}  inline>
                                    {"Rata"}
                                </Checkbox>
                                <Checkbox onClick={() => this.setState({ lastModChecked: !this.state.lastModChecked })}  inline>
                                    {"Ultima modifica"}
                                </Checkbox>
                            </FormGroup>
                        </Col>
                    </Row>
                <Row>
                    <Col sm={12} xs={12} style={{ marginLeft: 10, margin: 5 }}>
                        <Table id="resTable" style={{ fontSize: 13 }} striped bordered responsive>
                            <thead key="thead">
                                <tr>
                                    <th>{" #"}<br />
                                        <Button style={{ margin: 3 }} shape="circle" icon="down" size="small" onClick={() => this.handleOrderDownButtonPress("id", this.state.macRentInformations)} />
                                        <Button style={{ margin: 3 }} shape="circle" icon="up" size="small" onClick={() => this.handleOrderUpButtonPress("id", this.state.macRentInformations)} />
                                    </th>
                                    {this.state.ownerChecked &&
                                        <th>{"Possessore"}<br />
                                            <Button style={{ margin: 3 }} shape="circle" icon="down" size="small" onClick={() => this.handleOrderDownButtonPress("owner", this.state.macRentInformations)} />
                                            <Button style={{ margin: 3 }} shape="circle" icon="up" size="small" onClick={() => this.handleOrderUpButtonPress("owner", this.state.macRentInformations)} />
                                        </th>}
                                    {this.state.serialChecked &&
                                        <th>{"Numero di serie"}<br />
                                            <Button style={{ margin: 3 }} shape="circle" icon="down" size="small" onClick={() => this.handleOrderDownButtonPress("serial", this.state.macRentInformations)} />
                                            <Button style={{ margin: 3 }} shape="circle" icon="up" size="small" onClick={() => this.handleOrderUpButtonPress("serial", this.state.macRentInformations)} />
                                        </th>}
                                    {this.state.dateFromChecked &&
                                        <th>{"Data inizio"}<br />
                                            <Button style={{ margin: 3 }} shape="circle" icon="down" size="small" onClick={() => this.handleOrderDownButtonPress("dateFrom", this.state.macRentInformations)} />
                                            <Button style={{ margin: 3 }} shape="circle" icon="up" size="small" onClick={() => this.handleOrderUpButtonPress("dateFrom", this.state.macRentInformations)} />
                                        </th>}
                                    {this.state.dateToChecked &&
                                        <th>{"Data termine"}<br />
                                            <Button style={{ margin: 3 }} shape="circle" icon="down" size="small" onClick={() => this.handleOrderDownButtonPress("dateTo", this.state.macRentInformations)} />
                                            <Button style={{ margin: 3 }} shape="circle" icon="up" size="small" onClick={() => this.handleOrderUpButtonPress("dateTo", this.state.macRentInformations)} />
                                        </th>}
                                    {this.state.nameChecked &&
                                        <th>{"Nome Mac"}<br />
                                            <Button style={{ margin: 3 }} shape="circle" icon="down" size="small" onClick={() => this.handleOrderDownButtonPress("name", this.state.macRentInformations)} />
                                            <Button style={{ margin: 3 }} shape="circle" icon="up" size="small" onClick={() => this.handleOrderUpButtonPress("name", this.state.macRentInformations)} />
                                        </th>}
                                    {this.state.codeChecked &&
                                        <th>{"Codice affitto"}<br />
                                            <Button style={{ margin: 3 }} shape="circle" icon="down" size="small" onClick={() => this.handleOrderDownButtonPress("code", this.state.macRentInformations)} />
                                            <Button style={{ margin: 3 }} shape="circle" icon="up" size="small" onClick={() => this.handleOrderUpButtonPress("code", this.state.macRentInformations)} />
                                        </th>}
                                    {this.state.feeChecked &&
                                        <th>{"Rata mensile"}<br />
                                            <Button style={{ margin: 3 }} shape="circle" icon="down" size="small" onClick={() => this.handleOrderDownButtonPress("fee", this.state.macRentInformations)} />
                                            <Button style={{ margin: 3 }} shape="circle" icon="up" size="small" onClick={() => this.handleOrderUpButtonPress("fee", this.state.macRentInformations)} />
                                        </th>}
                                    {this.state.lastModChecked && <th>
                                        {"Ultima modifica"}<br />
                                        <Button style={{ margin: 3 }} shape="circle" icon="down" size="small" onClick={() => this.handleOrderDownButtonPress("lastMod", this.state.macRentInformations)} />
                                        <Button style={{ margin: 3 }} shape="circle" icon="up" size="small" onClick={() => this.handleOrderUpButtonPress("lastMod", this.state.macRentInformations)} />
                                    </th>}
                                    <th>Note<br /><br /></th>
                                    <th>Cancella<br /><br /></th>
                                    <th>Modifica<br /><br /></th>
                                </tr>
                            </thead>
                            <tbody key="tbody">
                                {(this.state.macRentInformations)
                                    .filter(element => this.filterValues(element, this.state.filterTerm))
                                    .map(macRentInfo =>
                                        <MacRentInfoRow key={macRentInfo.id}
                                            delete={this.deleteMacRentInformation.bind(this)}
                                            realId={macRentInfo.realId}
                                            id={macRentInfo.id}
                                            name={macRentInfo.name}
                                            code={macRentInfo.code}
                                            dateFrom={moment(macRentInfo.dateFrom).format("DD/MM/YYYY")}
                                            dateTo={moment(macRentInfo.dateTo).format("DD/MM/YYYY")}
                                            fee={String(macRentInfo.fee)}
                                            lastMod={macRentInfo.lastMod}
                                            note={macRentInfo.note}
                                            owner={macRentInfo.owner}
                                            serial={macRentInfo.serial}
                                            userName={this.state.userName}
                                            displayName= {this.state.nameChecked}
                                            displayCode = {this.state.codeChecked}
                                            displayDateFrom = {this.state.dateFromChecked}
                                            displayDateTo = {this.state.dateToChecked}
                                            displaySerial = {this.state.serialChecked}
                                            displayOwner = {this.state.ownerChecked}
                                            displayFee = {this.state.feeChecked}
                                            displayLastMod = {this.state.lastModChecked}
                                        />,
                                )
                                }
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Grid>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        elements: state.elements.data,
        fetchError: state.elements.fetchError,
        deleteError: state.elements.deleteError,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchRentInfo: bindActionCreators(fetchRentInfo, dispatch),
        deleteElement: bindActionCreators(deleteElement, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MacRentTable);
