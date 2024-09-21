<style scoped>
@import "./assets/mmoda.css";
@import "./assets/skin.css";
</style>


<script setup>
import { ref, onMounted } from 'vue'
import MMODAHeader from './MMODAHeader.vue'
import MMODAToolPanel from './MMODAToolPanel.vue';

import axios from 'axios'


const instr_list = ref([])

// https://galaxy.odahub.fr/api/tools/crbeam_astro_tool_pr79/build?version=latest&tool_version=latest

function call_oda() {
  console.log('fetching ODA tools')
  axios.get('https://www.astro.unige.ch/mmoda/dispatch-data/instr-list')
    .then(res => {
      for (let instr of res.data) {
        instr_list.value.push(
          {
            name: instr,
            desc: instr,
            galaxy_tool_id: null
          }
        )          
      }
      console.log('instr_list', instr_list)
    })
    .catch(err => console.error(err)); // promise

  console.log('fetching Galaxy tools')

  axios.get('/api/tools?in_panel=False')
    .then(res => {
      console.log('found tools', res.data)
      for (let tool of res.data) {
        // console.log('tool', tool['name'], tool['panel_section_id'])
        if (tool['panel_section_id'] && tool['panel_section_id'].includes("astro")) {
          instr_list.value.push({
            name: tool['id'].toLowerCase().replace(/[^a-z0-9]/g, ''),
            desc: tool['name'],
            galaxy_tool_id: tool['id']
          })          
        }
      }
    }).catch(err => console.error(err));
}


onMounted(() => {
  call_oda()
  console.log('mounted at', new Date())
});


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
              href="help/mmoda"><span class="oda-icon-label">Help</span>
              <span
              class="glyphicon glyphicon-info-sign">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path d="M13 7.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0Zm-3 3.75a.75.75 0 0 1 .75-.75h1.5a.75.75 0 0 1 .75.75v4.25h.75a.75.75 0 0 1 0 1.5h-3a.75.75 0 0 1 0-1.5h.75V12h-.75a.75.75 0 0 1-.75-.75Z"></path><path d="M12 1c6.075 0 11 4.925 11 11s-4.925 11-11 11S1 18.075 1 12 5.925 1 12 1ZM2.5 12a9.5 9.5 0 0 0 9.5 9.5 9.5 9.5 0 0 0 9.5-9.5A9.5 9.5 0 0 0 12 2.5 9.5 9.5 0 0 0 2.5 12Z"></path></svg>
             </span> </a>
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
      </div>
      </form>

      <form action="/mmoda/" method="POST" id="mmoda-common" accept-charset="UTF-8"><div><div class="row"><div id="edit-radec" class="form-item form-type-item">
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
        <!-- <li class="nav-item" role="presentation">
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
        </li> -->

        <li v-for="instr in instr_list" class="nav-item" role="presentation">          
          <a 
             class="nav-link" 
             :class="{active: instr.name === 'isgri'}"
             id="instr.name + '-tab'" 
             data-bs-toggle="tab" 
             :data-bs-target="'#' + instr.name"
             type="button" 
             role="tab" 
             :aria-controls="instr.name" 
             aria-selected="false"



            :href="'#' + instr.name" 
            data-toggle="tab"
            :key="instr.name" 
            :id="instr.name + '-tab'" 
            >
            <div class="tab-messenger">X-ray</div>
            <div class="tab-title">{{ instr.desc }}</div>
          </a>
        </li>                    

      </ul>


      
      <!-- Modal -->
      <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              ...
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" class="btn btn-primary">Save changes</button>
            </div>
          </div>
        </div>
      </div>
      <!-- /Modal -->

      <div class="tab-content" id="myTabContent">
        <div 
          v-for="instr in instr_list"
            class="tab-pane fade"
            :id="instr.name"
            role="tabpanel" 
            :aria-labelledby="instr.name + '-tab'"> 
              

              <div class="card m-2" style="width: 20rem;">
                <div class="card-header">
                  Query parameters:

                  <span class="panel-toolbox pull-right">
                    <span class="collapsible">
                      <span
                        class="intrument-toolbar btn-group pull-right"
                        role="group">
                      <a data-toggle="tooltip" title=""
                         data-original-title="Help"
                         class="btn btn-primary btn-help open-in-modal"
                         href="help/mmoda/isgri-expert">
                         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">                          
                          <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM216 336l24 0 0-64-24 0c-13.3 0-24-10.7-24-24s10.7-24 24-24l48 0c13.3 0 24 10.7 24 24l0 88 8 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-80 0c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-208a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"/>
                        </svg>
                      </a>
                      
                       
                    </span>
                  </span>
                </span>

                </div>
                <div class="card-body m-1">                  

                  <MMODAToolPanel :tool_data="instr" />

                  <div>
                    <hr class="hr-default" />                    
                    <button type="submit" id="submit" name="op" value="Submit" class="btn btn-primary form-submit"  data-bs-toggle="modal" data-bs-target="#exampleModal">Submit</button>
                    
                  </div>
                
                </div>
              </div>

              <!-- <div
                  class="instrument-panel instrument-panel-crbeam tab-pane fade in "
                  id="crbeam">
                <div id="crbeam-toolbox"
                    class="instrument-toolbox"></div>
                  <div id="crbeam-params"
                    class="panel panel-default instrument-params-panel">
                    <div class="panel-heading">
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
                        href="help/mmoda/crbeam-1"><span
                          class="glyphicon glyphicon-info-sign"> </span>
                      </a>
                       
                      </span>
                    </div>
                    <div class="panel-body"><form action="/mmoda//" method="post" id="mmoda-crbeam" accept-charset="UTF-8"><div><input type="hidden" name="form_build_id" value="form-X8Ho1uBREYfKIlYUsSx-UbEcxpW6zXIoED4to5ld6M8" />
<input type="hidden" name="form_token" value="VM8o4KViHWZkHziozm681cYyrWoHPSBA36aOhBSX6G4" />
<input type="hidden" name="form_id" value="mmoda_crbeam" />
</div></form>                                                            <div id="crbeam-paper-quote"
                        class="paper-quote alert alert-info alert-dismissible hidden"
                        role="alert">
                        <hr>
                        <a href="#" class="close" data-dismiss="alert"
                          aria-label="close" title="close">×</a> <span
                          class="glyphicon glyphicon-info-sign"> </span>
                        <div class="header-info-text">Service generated from <a href="https://gitlab.renkulab.io/astronomy/mmoda/crbeam.git" target="_blank">the repository</a></div>
                      </div>
                                          </div>
                  </div>
                  
                </div> -->
              
        </div>
      </div>
    
              <div class="pull-right">version: 7.x-1.0</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
</div>




</template>
