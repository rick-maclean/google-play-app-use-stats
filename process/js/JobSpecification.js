var React = require('react');

var JobSpecification = React.createClass({

  selectDataFile: function() {
    this.props.onselectdataFile();
  },
  selectJobSpecsFile: function() {
    this.props.onselectJobSpecsFile();
  },

   render: function() {
    return(
      <div className="panel panel-primary">
        <div className="panel-heading apt-addheading">Select Files</div>
        <div className="panel-body">
            <form className="form">
                 <h3>Job</h3>
                 <div className="form-group">
                     <label>Data File</label>
                     <div className="form-text" id="dataFileId" >{this.props.dataFile}</div>
                     <div className="col-sm-offset-3 col-sm-9">
                       <div className="pull-right">
                         <button type="button" className="btn btn-primary"  onClick={this.selecDataFile}>Select Data File</button>&nbsp;
                       </div>
                     </div>
                 </div>
                 <div className="form-group">
                     <label>Job Spec</label>
                     <div className="form-text" id="jobFilePathId" >{this.props.jobFilepath}</div>
                     <div className="col-sm-offset-3 col-sm-9">
                       <div className="pull-right">
                         <button type="button" className="btn btn-primary"  onClick={this.selectJobSpecsFile}>Select other file</button>&nbsp;
                       </div>
                     </div>
                 </div>
             </form>
         </div>
       </div>
    ) // return
  } // render
}); // JobSpecification

module.exports = JobSpecification;
