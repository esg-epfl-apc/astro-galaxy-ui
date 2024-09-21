<template>

    <div class="card panel-default">

      <!-- <!-- <div class="card-header"> -->

          <div class="float-end">
          <div class="main-toolbar btn-group" role="group">
                     <a data-toggle="tooltip" title=""
              data-original-title="Show API token, copy it or request it by email"
              class="ctools-use-modal ctools-modal-modal-popup-large btn btn-primary"
              href="modal_forms/nojs/webform/384"><span
              class="oda-icon-label">API token</span><span
              class="glyphicon glyphicon-star"> </span> </a>
                    <a title="Contact us"
              class="ctools-use-modal ctools-modal-modal-popup-large btn btn-primary"
              href="modal_forms/nojs/webform/383"> <span
              class="oda-icon-label">Contact us</span> <span
              class="glyphicon glyphicon-envelope"> </span>
            </a> <a id="help-home"
              title="MMODA  Help"
              class="btn btn-primary open-in-modal help-home"
              href="help/mmoda"><span class="oda-icon-label">Help</span><span
              class="glyphicon glyphicon-info-sign"> </span> </a>
          </div>
        </div>
        
      </div> -->
      

      <div id="formwrapper">
        <div id="common-params" class="common-params">
           <form action="/mmoda/" method="POST" id="mmoda-name-resolve" accept-charset="UTF-8"><div><div class="row"><div class="col-md-12"><div class="input-group form-item"><div class="form-item form-group form-type-textfield form-item-src-name">
            <label class="control-label" for="edit-src-name">Object name <span class="form-required" title="This field is required.">*</span></label>
            <input class="form-control form-control form-text required" type="text" id="edit-src-name" name="src_name" value="1E 1740.7-2942" size="60" maxlength="128" />
        </div>
      
      <span id="resolve-src-name" class="input-group-btn-hide form-group align-bottom"><button class="btn-primary form-item btn form-button" type="submit" id="edit-resolve-src-name" name="resolve_name" value="Resolve">Resolve</button>
<button class="btn-primary form-item btn form-button" type="submit" id="edit-explore-src-name" name="explore_name" value="Explore">Explore</button>
</span></div></div></div><input type="hidden" name="form_build_id" value="form-egu7IQHEdFliFu3OpFvCX2ZpHIjX56VmwefsEE-F1RQ" />
<input type="hidden" name="form_id" value="mmoda_name_resolve" />
</div></form>           <form action="/mmoda//" method="POST" id="mmoda-common" accept-charset="UTF-8"><div><div class="row"><div id="edit-radec" class="form-item form-type-item">
 <div class="form-item form-group col-md-6 form-type-textfield form-item-RA">
  <label class="control-label" for="edit-ra">RA </label>
 <input class="form-control form-control form-text" title="The right ascension." data-toggle="tooltip" type="text" id="edit-ra" name="RA" value="265.97845833" size="10" maxlength="128" />
</div>
<div class="form-item form-group col-md-6 form-type-textfield form-item-DEC">
  <label class="control-label" for="edit-dec">Dec </label>
 <input class="form-control form-control form-text" title="The declination." data-toggle="tooltip" type="text" id="edit-dec" name="DEC" value="-29.74516667" size="10" maxlength="128" />
</div>

</div>
</div><div class="row"><div id="edit-time" class="form-item form-type-item">
 <div class="form-item form-group col-md-5 form-type-textfield form-item-T1">
  <label class="control-label" for="edit-t1">Start time <span class="form-required" title="This field is required.">*</span></label>
 <input class="form-control form-control form-text required" type="text" id="edit-t1" name="T1" value="2017-03-06T13:26:48.0" size="10" maxlength="128" />
</div>
<div class="form-item form-group col-md-5 form-type-textfield form-item-T2">
  <label class="control-label" for="edit-t2">End time <span class="form-required" title="This field is required.">*</span></label>
 <input class="form-control form-control form-text required" type="text" id="edit-t2" name="T2" value="2017-03-06T15:32:27.0" size="10" maxlength="128" />
</div>
<div class="form-item form-group col-md-2 form-type-select form-item-T-format">
  <label class="control-label" for="edit-t-format">Time unit </label>
 <select class="form-control form-control form-select" id="edit-t-format" name="T_format"><option value="isot">ISO/ISOT</option><option value="mjd">MJD</option></select>
</div>

</div>
</div>
<input type="hidden" name="form_id" value="mmoda_common" />
</div>
</form>          
</div>

</template>