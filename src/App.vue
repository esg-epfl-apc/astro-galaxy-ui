<style scoped>
@import "./assets/mmoda.css";
@import "./assets/skin.css";
</style>


<script setup>
import { ref, onMounted } from 'vue'
import MMODAHeader from './MMODAHeader.vue'

import axios from 'axios'

const count = ref(0)
const dstyle = ref('display: none;')
const instr_list = ref([])

function call_oda() {
  axios.get('https://www.astro.unige.ch/mmoda/dispatch-data/instr-list')
    .then(res => {
      instr_list.value = res.data
      console.log('instr_list', instr_list)
    })
    .catch(err => console.error(err)); // promise

  axios.get('/tools')
      .then(res => {
        console.log('tools', res.data)
        for (let tool of res.data) {
          // console.log('tool', tool['name'], tool['panel_section_id'])
          if (tool['panel_section_id'] && tool['panel_section_id'].includes("astro")) {
            instr_list.value.push(tool['name'])
            
          }
        }

      }).catch(err => console.error(err)); // promise
}


onMounted(() => {
  call_oda()
  console.log('mounted at', new Date())
});


  // some other configuration


</script>

<template>

<MMODAHeader/>


   <div class="content" >
    <div class="card panel-default">

      <div class="card-header">

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
        
      </div>


      

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

<div class="instruments-panel panel with-nav-tabs panel-primary">
  <div class="panel-heading"></div>
  <div class="panel-body">



    <div class="tabs">

      <ul class="nav nav-tabs" id="myTab" role="tablist">
        <li class="nav-item" role="presentation">
          <a href="#instr" data-toggle="tab" class="nav-link active" id="isgri-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="isgri" aria-selected="true">
              <div class="tab-messenger">Hard X-ray</div>
              <div class="tab-title">ISGRI</div>
            </a>
        </li>
        <li class="nav-item" role="presentation">
          <a class="nav-link" 
             id="profile-tab" 
             data-bs-toggle="tab" 
             data-bs-target="#profile" 
             type="button" 
             role="tab" 
             aria-controls="profile" 
             aria-selected="false">
              <div class="tab-messenger">X-ray</div>
              <div class="tab-title">JEM-X</div>
          </a>
        </li>

        <li v-for="instr in instr_list" class="nav-item" role="presentation">          
          <a 
             class="nav-link" 
             :class="{active: instr.id === 'isgri'}"
             id="instr + '-tab'" 
             data-bs-toggle="tab" 
             :data-bs-target="'#' + instr"
             type="button" 
             role="tab" 
             :aria-controls="instr" 
             aria-selected="false"



            :href="'#' + instr" 
            data-toggle="tab"
            :key="instr" 
            :id="instr + '-tab'" 
            >
            <div class="tab-messenger">X-ray</div>
            <div class="tab-title">{{ instr }}</div>
          </a>
        </li>                    

      </ul>


      <div class="tab-content" id="myTabContent">
        <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="isgri-tab">1...</div>
        <div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">2...</div>
        <div 
          v-for="instr in instr_list"
            class="tab-pane fade"
            :id="instr"
            role="tabpanel" 
            :aria-labelledby="instr + '-tab'"> 
              {{ instr }}...
        </div>
      </div>
    
<!-- 
    <div class="tab-content">
      <div
        class="instrument-panel tab-pane fade in active"
        id="isgri">
      <div 
        id="isgri-toolbox"
        class="instrument-toolbox"></div>
      <div 
        id="isgri-params"
        class="panel panel-default instrument-params-panel">
        <div 
          class="panel-heading">
        <div class="instrument-params-panel-title">Query
                parameters :</div>
              <span class="panel-toolbox pull-right"> <span
                class="collapsible"><span
                  class="glyphicon glyphicon-chevron-up"> </span></span>
              </span> <span
                class="intrument-toolbar btn-group pull-right"
                role="group">
                                        <a data-toggle="tooltip" title=""
                data-original-title="Help"
                class="btn btn-primary btn-help open-in-modal"
                href="help/mmoda/integral-isgri"><span
                  class="glyphicon glyphicon-info-sign"> </span>
              </a>
                
              </span>
            </div>

<div class="panel-body"><form class="isgri-form" enctype="multipart/form-data" action="dispatch-data/run_analysis" method="POST" id="mmoda-isgri" accept-charset="UTF-8"><div><input integral_instrument="true" support_return_progress="false" type="hidden" name="instrument" value="isgri" />
<div class="row"><div class="form-item form-group col-md-6 form-type-select form-item-osa-version">
  <label class="control-label" for="edit-osa-version">OSA Version </label>
 <select class="form-control form-control form-select" id="edit-osa-version" name="osa_version"><option value="OSA10.2">OSA10.2</option><option value="OSA11.2" selected="selected">OSA11.2</option></select>
</div>
<div class="form-item form-group col-md-6 form-type-textfield form-item-radius">
  <label class="control-label" for="edit-radius">Radius </label>
 <input name="mmoda_isgri_radius" class="form-control form-control form-text" data-bv-numeric="true" type="text" id="edit-radius" value="15" size="10" maxlength="128" /> <span class="field-suffix">deg</span>
</div>
</div><hr class="hr-default" /><div class="row"><div class="form-item form-group col-md-8 form-type-radios form-item-use-scws">
  <label for="edit-use-scws">Use INTEGRAL pointing Science Windows (ScWs) </label>
 <div id="edit-use-scws" class="form-radios"><div class="form-item form-type-radio form-item-use-scws">
 <input name="mmoda_isgri_use_scws" type="radio" id="edit-use-scws-no" value="no" checked="checked" class="form-radio" />  <label class="option" for="edit-use-scws-no">Select for time range </label>

</div>
<div class="form-item form-type-radio form-item-use-scws">
 <input name="mmoda_isgri_use_scws" type="radio" id="edit-use-scws-form-list" value="form_list" class="form-radio" />  <label class="option" for="edit-use-scws-form-list">Custom list </label>

</div>
<div class="form-item form-type-radio form-item-use-scws">
 <input name="mmoda_isgri_use_scws" type="radio" id="edit-use-scws-user-file" value="user_file" class="form-radio" />  <label class="option" for="edit-use-scws-user-file">Custom list in file </label>

</div>
</div>
</div>
</div><div class="row"><div class="form-item form-group col-md-6 form-type-textfield form-item-max-pointings">
  <label class="control-label" for="edit-max-pointings">Maximum number of ScWs </label>
 <input class="form-control form-control form-text" data-bv-numeric="true" title="randomly selected in the time range" data-toggle="tooltip" type="text" id="edit-max-pointings" name="max_pointings" value="50" size="10" maxlength="128" />
</div>
</div><div class="row"><div class="form-item form-group col-md-12 form-type-textarea form-item-scw-list">
  <label class="control-label" for="edit-scw-list">ScWs List </label>
 <div class="form-textarea-wrapper resizable"><textarea class="form-control form-control form-textarea" id="edit-scw-list" name="scw_list" cols="60" rows="5">005100410010.001,005100420010.001</textarea></div>
</div>
</div><div class="row"><div class="form-item form-group col-md-8 form-type-file form-item-files-user-scw-list-file">
  <label class="control-label" for="edit-user-scw-list-file">ScWs file </label>
 <input name="user_scw_list_file" class="user_scw_list_file form-control form-file" title="An ASCII file, one ScW per line." data-toggle="tooltip" type="file" id="edit-user-scw-list-file" size="60" /> <span class="field-suffix"><span class="fa fa-times clear-left-input"></span></span>
</div>
</div><hr class="hr-default" /><div class="row"><div class="form-item form-group col-md-6 form-type-radios form-item-integral-data-rights">
  <label class="control-label" for="edit-integral-data-rights">INTEGRAL data access priviledge </label>
 <div id="edit-integral-data-rights" class="form-radios"><div class="form-item form-type-radio form-item-integral-data-rights">
 <input name="mmoda_isgri_integral_data_rights" type="radio" id="edit-integral-data-rights-public" value="public" checked="checked" class="form-radio" />  <label class="option" for="edit-integral-data-rights-public">Public </label>

</div>
<div class="form-item form-type-radio form-item-integral-data-rights">
 <input name="mmoda_isgri_integral_data_rights" type="radio" id="edit-integral-data-rights-all-private" value="all-private" class="form-radio" />  <label class="option" for="edit-integral-data-rights-all-private">All Private </label>

</div>
</div>
</div>
</div><div class="row"><div class="form-item form-group col-md-6 form-type-textfield form-item-E1-keV">
  <label class="control-label" for="edit-e1-kev">Energy Min <span class="form-required" title="This field is required.">*</span></label>
 <input class="form-control form-control form-text required" data-bv-numeric="true" title="The minimum of the energy band." data-toggle="tooltip" type="text" id="edit-e1-kev" name="E1_keV" value="28" size="10" maxlength="128" /> <span class="field-suffix">keV</span>
</div>
<div class="form-item form-group col-md-5 form-type-textfield form-item-E2-keV">
  <label class="control-label" for="edit-e2-kev">Energy Max <span class="form-required" title="This field is required.">*</span></label>
 <input class="form-control form-control form-text required" data-bv-numeric="true" title="The maximum of the energy band." data-toggle="tooltip" type="text" id="edit-e2-kev" name="E2_keV" value="40" size="10" maxlength="128" /> <span class="field-suffix">keV</span>
</div>
</div><hr class="hr-default" /><div class="row"><div class="form-item form-group col-md-6 form-type-select form-item-query-type">
  <label class="control-label" for="edit-query-type">Query Type </label>
 <select class="form-control form-control form-select" title="Select query type" data-toggle="tooltip" id="edit-query-type" name="query_type"><option value="Real" selected="selected">Real</option><option value="Dummy">Dummy</option></select>
</div>
<div class="form-item form-group col-md-5 form-type-textfield form-item-detection-threshold">
  <label class="control-label" for="edit-detection-threshold">Detection Threshold </label>
 <input class="form-control form-control form-text" data-bv-numeric="true" title="Output catalog significance threshold" data-toggle="tooltip" type="text" id="edit-detection-threshold" name="detection_threshold" value="7" size="60" maxlength="128" />
</div>
</div><hr class="hr-default" /><div class="row"><div class="form-item form-group col-md-6 form-type-radios form-item-product-type">
  <label class="control-label" for="edit-product-type">Product Type </label>
 <div id="edit-product-type" class="form-radios"><div class="form-item form-type-radio form-item-product-type">
 <input name="mmoda_isgri_product_type" type="radio" id="edit-product-type-isgri-image" value="isgri_image" checked="checked" class="form-radio" />  <label class="option" for="edit-product-type-isgri-image">Image </label>

</div>
<div class="form-item form-type-radio form-item-product-type">
 <input name="mmoda_isgri_product_type" type="radio" id="edit-product-type-isgri-spectrum" value="isgri_spectrum" class="form-radio" />  <label class="option" for="edit-product-type-isgri-spectrum">Spectrum </label>

</div>
<div class="form-item form-type-radio form-item-product-type">
 <input name="mmoda_isgri_product_type" type="radio" id="edit-product-type-isgri-lc" value="isgri_lc" class="form-radio" />  <label class="option" for="edit-product-type-isgri-lc">Light curve </label>

</div>
</div>
</div>
</div><div class="row"><div class="form-item form-group col-md-6 form-type-textfield form-item-time-bin">
  <label class="control-label" for="edit-time-bin">Time bin </label>
 <input class="form-control form-control form-text" data-bv-numeric="true" data-mmoda-time-bin-min="20" title="Minimum value is 20 seconds." data-toggle="tooltip" type="text" id="edit-time-bin" name="time_bin" value="1000" size="60" maxlength="128" />
</div>
<div class="form-item form-group col-md-4 form-type-select form-item-time-bin-format">
  <label class="control-label" for="edit-time-bin-format">Unit </label>
 <select class="form-control time_bin_format form-control form-select" id="edit-time-bin-format" name="time_bin_format"><option value="sec" selected="selected">Seconds</option><option value="jd">Days</option></select>
</div>
</div><hr class="hr-default" /><div class="row"><div class="form-item form-group col-md-8 form-type-file form-item-files-user-catalog-file">
  <label class="control-label" for="edit-user-catalog-file">User catalog </label>
 <input name="user_catalog_file" class="form-control form-file" type="file" id="edit-user-catalog-file" size="60" />
<div class="description">If needed, create a custom catalog following one of the templates : <a href="sites/all/modules/mmoda/data/catalog.txt" download>ASCII</a> or <a href="sites/all/modules/mmoda/data/catalog.fits" download>FITS</a>.</div>
</div>
</div><hr class="hr-default" /><button type="submit" id="edit-submit" name="op" value="Submit" class="btn btn-primary form-submit">Submit</button>
<input type="hidden" name="form_build_id" value="form--2Nz43_t4X0vy3GusF3blg-p4JVNWPaaB0nvIjdnSdA" />
<input type="hidden" name="form_token" value="YwI9NfqyCUQ7Ub6nrHitR1B6INreXSZ7hZL9zsIr7a0" />
<input type="hidden" name="form_id" value="mmoda_isgri" />
</div></form>                                                            <div id="isgri-paper-quote"
                        class="paper-quote alert alert-info alert-dismissible hidden"
                        role="alert">
                        <hr>
                        <a href="#" class="close" data-dismiss="alert"
                          aria-label="close" title="close">×</a> <span
                          class="glyphicon glyphicon-info-sign"> </span>
                        <div class="header-info-text">
    If you use results or material from this instrument in our application, ODA, do not
    forget to quote our paper:<br> <a
      href="https://arxiv.org/abs/2002.12895" target="_blank">A.
      Neronov, V. Savchenko, A. Tramacere, M. Meharga, C. Ferrigno,
      S.Paltani<br> An online data analysis system of INTEGRAL telescope
    </a></div>
                      </div>
                                          </div>
                  </div>
                  
                </div>
 
              </div>                          -->
              <hr class="hr-default" />
              <div class="pull-right">version: 7.x-1.0</div>
                        </div>
          </div>
        </div>
      </div>
    </div>
    
</div>




</template>
