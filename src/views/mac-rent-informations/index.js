import React, {Component} from "react";
import {FormGroup, FormControl, InputGroup, Grid, Col, Row, Popover, Image, OverlayTrigger} from "react-bootstrap";
import moment from "moment";
import PropTypes from "prop-types";

import SimpleModal from "../../components/simpleModal"


import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { saveElement } from "../../actions/elements";
import { fetchRow } from "../../actions/elements";


import image from "../../assets/images/image.png";

import Button from "antd/lib/button";
import DatePicker from "antd/lib/date-picker";
import message from "antd/lib/message";


export class MacRentInformations extends Component {

    constructor(props) {
        super(props);

        this.state = {
            note: "",
            id: 0,
            dateFrom: moment(),
            dateTo: moment(),
            name: "",
            code: "",
            serial: "",
            owner: "",
            fee: 0,
            exist: undefined,
            importantChange: false,
            showSaveSuccessModal: false,
            showSaveErrorModal: false, 
            showFetchErrorModal: false, 
            isSaveButtonClicked: false,
            dateFromOk: true,
            dateToOk: true,
            userName: localStorage.getItem("userName"),
            title: "",
            macRentInformations: [],
        };
    }

    static propTypes = {
        match: PropTypes.object,
        saveSuccess: PropTypes.bool,
        saveError: PropTypes.bool,
        fetchRowError: PropTypes.bool,
        fetchedElement: PropTypes.object,
    }


    componentDidMount() {
        
        const { fetchRow } = this.props;
        
        
         var id = window.location.href.substring(window.location.href.lastIndexOf('/') + 1);
                 if (fetchRow && id > 0) { 
                     fetchRow(id);
                 }
                
        this.setState({
            title: (id > 0) ? "Modifica i dati di affitto id un mac" : "Inserire nuovi dati di affitto MacBook",
        });
        
    }


    componentWillReceiveProps(nextProps) {

        if (this.props.saveError !== nextProps.saveError) {
            this.setState({
                showSaveErrorModal: true
            });
        } else {
            this.setState({
                showSaveErrorModal: false
            });}

        if (this.props.saveSuccess !== nextProps.saveSuccess) {
            this.setState({
                showSaveSuccessModal: true
            });
        }

        if (this.props.fetchedElement !== nextProps.fetchedElement) {
            this.setState({
                owner: nextProps.fetchedElement.owner,
                note: nextProps.fetchedElement.note,
                id: nextProps.fetchedElement.id,
                dateFrom: nextProps.fetchedElement.dateFrom,
                dateTo: nextProps.fetchedElement.dateTo,
                name: nextProps.fetchedElement.name,
                code: nextProps.fetchedElement.code,
                serial: nextProps.fetchedElement.serial,
                fee: nextProps.fetchedElement.fee,
                exist: nextProps.fetchedElement.exist,
                });
        }

        console.log(this.state.showFetchErrorModal);
        if (nextProps.fetchRowError) {
            this.setState({
                showFetchErrorModal: true
            });
        } else {
            this.setState({
                showFetchErrorModal: false
            });
        }

        

    }

    handleChange(date){
        message.info("Selected Date: " + date.toString());
        this.setState({ date });
    }

    handleSaveButton(isSaveButtonClicked, userName){
        this.setState({isSaveButtonClicked: true});
    
        // console.log("qui funzione", this.props.saveElement);
        // console.log("salvato con successo", this.props.saveSuccess);
        // console.log("salvo con delete nello stato uguale a :", this.state.exist);

        if (this.props.saveSuccess) {
            this.setState({ showSaveSuccessModal: true });
        }
        
        if (this.state.owner && this.state.serial && this.state.dateFromOk && this.state.dateToOk) {

            this.props.saveElement(this.state.id, this.state.name, this.state.code, this.state.dateFrom, this.state.dateTo, this.state.fee, this.state.serial, this.state.note, this.state.owner, this.state.exist, this.state.importantChange);
        }

        
    }

    handleDateFromChange(date, dateString){
        this.setState(state => {
        state.dateFrom= date;
            }, ()=>{
                this.setState({ dateFromOk: (this.state.dateFrom ? true : false), importantChange: true  });
            });
    }
    handleDateToChange(date, dateString){
        this.setState(state => {
        state.dateTo= date;
            }, ()=>{
                this.setState({ dateToOk: (this.state.dateTo ? true: false), importantChange: true });
            });
    }


    closeSaveSuccessModal() { 
        this.setState({ showSaveSuccessModal: false });
        this.props.history.push(`/results/`);
    }

    closeSaveErrorModal() {
        this.setState({ showSaveErrorModal: false });
    }
    
    closeFetchErrorModal() {
        this.setState({ showFetchErrorModal: false });
        this.props.history.push(`/results/`);
    }

    renderSaveSuccessModal() { 
        return (<SimpleModal show={this.state.showSaveSuccessModal} close={this.closeSaveSuccessModal.bind(this)} title="Salvataggio elemento avvenuto con successo" />);
    }

    renderSaveErrorModal() { 
        return (<SimpleModal show={this.state.showSaveErrorModal} close={this.closeSaveErrorModal.bind(this)} title="Salvataggio elemento fallito" />);
    }

    renderFetchErrorModal() {
        return (<SimpleModal show={this.state.showFetchErrorModal} close={this.closeFetchErrorModal.bind(this)} title="Recupero dati da modificare è fallito" />);
    }

    render () {
        return (
            <form id="formRentInformation">
                {this.renderSaveSuccessModal()}
                {this.renderSaveErrorModal()}
                {this.renderFetchErrorModal()}
                {console.log("fetchedel", this.props.fetchedElement, "delete", this.state.exist)}
                <Grid>
                    <Row><Col xs={12} md={12}><center><h2>{this.state.title}</h2></center></Col></Row>
                    <Row>
                        <Col xs={12} md={12} style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                            <Image src={image} responsive />
                            </Col>
                    </Row>
                    <Row className="show-grid">
                        <FormGroup validationState={!this.state.owner && this.state.isSaveButtonClicked ? "error": null }>
                            <Col sm={4} style = {{marginBottom: 5}}>{"Possessore"}</Col>
                            <Col sm = {7} xs={10}>
                                <FormGroup controlId="formBasicText" >
                                    <FormControl type="text"
                                            placeholder="Inserisci il nome dell'attuale possessore"
                                            onChange={e => this.setState({ owner: e.target.value, importantChange: true })}
                                            value={this.state.owner}
                                        />
                                        <FormControl.Feedback />
                                </FormGroup>
                            </Col>
                            <Col sm = {1} xs={1}>
                                <OverlayTrigger trigger="click" placement="top" overlay={
                                    <Popover id="popover-positioned-right" title="info">
                                            {"Persona a cui è affidato il Mac"}
                                    </Popover>
                                    }>
                                    <Button shape="circle" icon="info" />
                                </OverlayTrigger>
                            </Col>
                        </FormGroup>
                    </Row>
                    <Row className="show-grid">
                        <FormGroup validationState={!this.state.serial && this.state.isSaveButtonClicked ? "error": null }>
                            <Col sm={4} style = {{marginBottom: 5}}>{"Numero di serie"}</Col>
                            <Col sm={8}>
                                <FormGroup controlId="formBasicText">
                                    <FormControl type="text"
                                            placeholder="Inserisci seriale del tuo Mac"
                                            onChange={e => this.setState({ serial: e.target.value, importantChange: true})}
                                            value={this.state.serial}
                                        />
                                        <FormControl.Feedback />
                                </FormGroup>
                            </Col>
                        </FormGroup>
                    </Row>
                    <Row className="show-grid" style ={{marginBottom: 15}}>
                        <FormGroup validationState={!this.state.dateFromOk && this.state.isSaveButtonClicked ? "error": null }>
                            <Col sm={4} style = {{marginBottom: 5}}>{"Data inizio contratto"}</Col>
                            <Col sm={8}>
                                <DatePicker
                                    allowClear={false}    
                                    size={"large"}
                                    format={"DD/MM/YYYY"}
                                    onChange={this.handleDateFromChange.bind(this)}
                                    value={moment(this.state.dateFrom)}
                                /> 
                            </Col>
                        </FormGroup>
                    </Row>

                    <Row className="show-grid" style ={{marginBottom: 15}}>
                        <FormGroup validationState={!this.state.dateToOk && this.state.isSaveButtonClicked ? "error": null }>
                            <Col style = {{marginBottom: 5}} sm={4}>{"Data termine contratto"}</Col>
                            <Col sm={8}>
                                <DatePicker 
                                    allowClear={false}      
                                    size={"large"}
                                    format={"DD/MM/YYYY"}
                                    onChange={this.handleDateToChange.bind(this)}
                                    value={moment(this.state.dateTo)}
                                />
                            </Col>
                        </FormGroup>
                    </Row>

                    <Row className="show-grid">
                        <FormGroup validationState={null}>
                            <Col sm={4} style = {{marginBottom: 5}}>{"Nome mac"}</Col>
                            <Col sm={8}>
                                <FormGroup controlId="formBasicText" >
                                    <FormControl type="text"
                                        placeholder="Inserisci nome del MacBook"
                                        onChange={e => this.setState({ name: e.target.value })}
                                        value={this.state.name}
                                    />
                                    <FormControl.Feedback />
                                </FormGroup>
                            </Col>
                        </FormGroup>
                    </Row>

                    <Row className="show-grid">
                        <FormGroup validationState={null }>
                            <Col sm={4}style = {{marginBottom: 5}}>{"Codice Contratto"}</Col>
                            <Col sm={8}>
                                <FormGroup controlId="formBasicText">
                                    <FormControl type="text"
                                        placeholder="Inserisci il codice del contratto d'affitto"
                                        onChange={e => this.setState({ code: e.target.value })}
                                        value={this.state.code}                                    />
                                    <FormControl.Feedback />
                                </FormGroup>
                            </Col>
                        </FormGroup>
                    </Row>



                    
                    <Row className="show-grid">
                        <FormGroup validationState={null }>
                            <Col sm={4} style = {{marginBottom: 5}}>{"Rata mensile"}</Col>
                            <Col sm={8}>
                                <FormGroup validationState={ typeof (Number(this.state.fee)) !== "number" ? "error" : null}>
                                    <InputGroup>
                                        <FormControl 
                                            placeholder="Inserisci importo rata mensile"
                                            type="number"
                                            onChange={e => this.setState({ fee: e.target.value })}
                                            value={this.state.fee}
                                            />
                                            <InputGroup.Addon>€</InputGroup.Addon>
                                    </InputGroup>
                                </FormGroup>
                            </Col>
                        </FormGroup>
                    </Row>

                    <Row className="show-grid">
                        <FormGroup>
                            <Col sm={4} style = {{marginBottom: 5}}>{"Note"}</Col>
                            <Col sm={8}>
                                <FormGroup controlId="formControlsTextarea">
                                    <FormControl componentClass="textarea"
                                        placeholder="Inserisci eventuali note"
                                        value={ this.state.note}
                                        onChange={e => this.setState({ note: e.target.value })}/>
                                </FormGroup>
                            </Col>
                        </FormGroup>
                    </Row>

                    <Row className="show-grid">
                            <Col sm={2} smOffset={5} xs={4} xsOffset={1} style = {{marginBottom: 5}}>
                                <Button onClick={() => this.props.history.push("/results/")}>Annulla</Button>
                            </Col>
                            <Col sm={1} xs={1}>
                                <Button type="primary" onClick={() =>this.handleSaveButton(this.isSaveButtonClicked, this.userName)}> Salva </Button>
                            </Col>
                    </Row>
                </Grid>
            </form>
        );
    }

}


const mapStateToProps = (state) => {
    return {
        saveSuccess: state.elements.saveSuccess,
        saveError: state.elements.saveError,
        fetchRowError: state.elements.fetchRowError,
        fetchedElement: state.elements.fetchedElement,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        saveElement: bindActionCreators(saveElement, dispatch),
        fetchRow: bindActionCreators(fetchRow, dispatch),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MacRentInformations);



