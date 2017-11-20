var React = require('react');
var ReactDOM = require('react-dom');
var _ = require('lodash');

//var Line = require('rc-progress').Line;
//var Circle = require('rc-progress').Circle;

var LoginSubcomponent = require('./LoginSubcomponent');
var JobSpecification = require('./JobSpecification');

function persistData(storage_key, jsonData) {
  console.log('inside persitComponent() and storage_key is ' + storage_key + ', and jsonData is, ' + jsonData);
    const appStorage = require('electron-json-storage');
    //Write
    appStorage.set(storage_key, jsonData, function (error) {
        if (error) throw error;
    });
}

function isNonemptyString(str) {
  if (typeof str === 'string' && str.length > 0) {
      return true;
  }
  else {
    return false;
  }
}

var jsonData =   '{   "loginPersistKey": "email@somedomain.org" , "dataPersistKey" : "c-path-pathtofilesFOLDER", "jobFilePersistKey" : "c-path-jobfilename"}';
var jsonToObjData = JSON.parse(jsonData);

var MainInterface = React.createClass({
  getInitialState: function() {
    return {
      emailUsername: '',
        password: '',
        dataFile: 'dataFile',
        dataFileSelected: false,
        jobFilepath: 'jobFilepath',
        jobFilepathSelected: false,
        currentByteCount: 0,
        totalByteCount: 0,
        userKey: '',
        errorMessage: '',
        electronJsonStoredValue: '',
        persistedData: jsonToObjData
    } //return
  }, //getInitialState

  componentDidMount: function() {
    console.log('componentDidMount lifecycle running');

    var data = this.state.persistedData;

      console.log('inside onestorePersistedAllData');
      console.log('data.loginPersistKey is =>' +data.loginPersistKey);
      console.log('data.metaDataPersistKey is =>' +data.metaDataPersistKey);
      console.log('data.jobFilePersistKey is =>' +data.jobFilePersistKey);
      // console.log('ALL the data restored from electron-json-storage  is : ' + data);
      jQuery('#inputEmail').val(data.loginPersistKey);

      if (isNonemptyString(data.dataPersistKey) ) {
        jQuery('#dataFileId').text(data.dataPersistKey);
        this.setState( { dataFileSelected : true }); //setState
      }

      if (isNonemptyString(data.jobFilePersistKey) ) {
        jQuery('#jobFilePathId').text(data.jobFilePersistKey);
        this.setState( { jobFilepathSelected : true }); //setState
      }

      if (isNonemptyString(data.jobFilePersistKey) && isNonemptyString(data.metaDataPersistKey)) {
        $('#sendButton').removeAttr("disabled");
      }

  }, //componentDidMount

  componentWillUnmount: function() {
    this.serverRequest.abort();
  }, //componentWillUnmount

  componentDidUpdate: function() {
    console.log('componentDidUpdate lifecycle running');
    console.log('this.state.dataFile is =>' + this.state.dataFile);
    console.log('this.state.dataFileSelected is =>' + this.state.dataFileSelected);
    console.log('this.state.jobFilepath is =>' + this.state.jobFilepath);
    console.log('this.state.jobFilepathSelected is =>' + this.state.jobFilepathSelected);
}, //componentDidUpdate

  mainHandleLogin: function(loginCredentials) {
    var subuserName = loginCredentials.userName;
    var subpassword = loginCredentials.password;
    console.log('subuserName is = ' + subuserName);
    console.log('subpassword is = '  + subpassword);
    /*this.setState( {
      emailUsername : subuserName,
      password: subpassword
    }); //setState */
    this.setState( {
      emailUsername : subuserName,
      password : subpassword
      }); //setState
    //persistComponent('loginPersistKey', subuserName);
  }, //mainHandleLogin

  onSelectMetaDataFile: function () {
    console.log('called onSelectMetaDataFile');
          this.setState({ dataFileSelected: true });
          this.setState({  dataFile: 'c-path-pathtofilesFOLDER' });
      console.log('end of onSelectMetaDataFile');
  },

  onSelectJobSpecsFile: function () {
    console.log('called onSelectJobSpecsFile');
        this.setState({ jobFilepathSelected: true });
        this.setState({ jobFilepath: 'c-path-jobfilename' });
      console.log('end of onSelectJobSpecsFile');
  },

  render: function() {

    $('#sendButton').removeAttr("disabled");


    return (
      <div className="interface">
        <LoginSubcomponent
        subHandleLogin = {this.mainHandleLogin}
        subUsername = {this.state.emailUsername}
        subPassword = {this.state.password}
        />
        <JobSpecification
            metadataFilepath = {this.state.metadataFilepath}
            jobFilepath = {this.state.jobFilepath}
            onselectMetaDataFile = {this.onSelectMetaDataFile}
            onselectJobSpecsFile = {this.onSelectJobSpecsFile}
        />
      </div>

    ) //return
  } //render
}); //MainInterface

ReactDOM.render(
  <MainInterface />,
  document.getElementById('googlePlayAppStats')
); //render
