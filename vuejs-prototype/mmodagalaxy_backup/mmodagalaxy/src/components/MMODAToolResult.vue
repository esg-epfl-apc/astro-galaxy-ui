<template>
  <div class="container" ref="scriptContainer">

    <div class="custom-inner-container input-column">
      <header class="custom-inner-header">
        <h2 class="header-inner-title">{{ lower_kev }} - {{ upper_kev }} keV</h2>
        <div class="container-actions">
          <span class="span-run-date">{{ run_time }}</span>
          <button id="remove-button" class="action-button" @click="handleRemove">
            <i class="action-icon">&times;</i>
          </button>
          <button id="hide-button" class="action-button" @click="toggleHidden">
            <i class="action-icon">&uarr;</i>
          </button>
        </div>
      </header>
      <div class="container-results" v-show="!isHidden">
        <div class="button-row">
          <button id="button-js9" @click="setContent('js9')">JS9</button>
          <button id="button-aladinlite" @click="setContent('image')">Image</button>
          <button id="button-astrovisjs" @click="setContent('graph')">Graph</button>
          <button id="button-download" @click="setContent('download')">Download</button>
          <button id="button-catalog" @click="setContent('catalog')">Catalog</button>
          <button id="button-query" @click="setContent('query_parameters')">Query parameters</button>
          <button id="button-log" @click="setContent('log')">Log</button>
          <button id="button-share" @click="setContent('share')">Share</button>
          <button id="button-api" @click="setContent('api_code')">API code</button>
          <button id="button-renku" @click="setContent('renku')">View on Renku</button>
        </div>
        <div id="inner-container-results">
          <p v-if="contentType === 'text'">{{ content }}</p>
          <div v-else-if="contentType === 'image'">
            <div id="aladin-lite-div">

            </div>
          </div>
          <div v-else-if="contentType === 'graph'">
              <iframe id="astrovis-iframe" ref="astrovis_iframe" style="width: 100%; height: 1000px">

              </iframe>
          </div>
          <div v-else-if="contentType === 'catalog'" class="catalog-container">
            <div v-for="(value, key) in catalog_data" :key="key" class="catalog-section">
              <h3 class="catalog-title">{{ key }}</h3>

              <table v-if="Array.isArray(value) && Array.isArray(value[0])" class="catalog-table">
                <thead>
                <tr>
                  <th v-for="(col, colIndex) in catalog_data.cat_column_names" :key="colIndex" class="catalog-header">
                    {{ col }}
                  </th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(row, rowIndex) in value" :key="rowIndex" class="catalog-row">
                  <td v-for="(cell, cellIndex) in row" :key="cellIndex" class="catalog-cell">
                    {{ cell }}
                  </td>
                </tr>
                </tbody>
              </table>

              <ul v-else-if="Array.isArray(value)" class="catalog-list">
                <li v-for="(item, index) in value" :key="index" class="catalog-list-item">
                  {{ item }}
                </li>
              </ul>

              <p v-else class="catalog-info">
                <strong>{{ key }}:</strong> {{ value }}
              </p>
            </div>
          </div>
          <ul v-else-if="contentType === 'parameters'" class="parameters-list">
            <li v-for="(value, key) in query_parameters" :key="key" class="parameters-list-item">
              <strong class="parameter-key">{{ key }}:</strong> <span class="parameter-value">{{ value }}</span>
            </li>
          </ul>
          <div v-else-if="contentType === 'html'" v-html="content"></div>
          <pre v-else-if="contentType === 'code'">
            <code v-html="content" class="custom-highlight"></code>
          </pre>
          <div v-else-if="contentType === 'logs'">
            <li v-for="(value, key) in logs" :key="key" class="parameters-list-item">
              <strong class="parameter-key">{{ key }}:</strong> <span class="parameter-value">{{ value }}</span>
            </li>
          </div>
        </div>
      </div>
    </div>

    <!--div id="f93f13ed-35e7-4cb1-94be-a4672f99af9f" data-root-id="p4234" style="display: contents;"></div-->

  </div>
</template>

<script>
import * as Bokeh from "@bokeh/bokehjs";
import {nextTick, onMounted, ref, toRaw} from "vue";
import isgri_tool_result from "@/data/isgri_tool_result.json"
import mmoda_isgri_result from "@/data/isgri_tool_result.json";
import fits_file from "@/assets/HorseHead.fits";

export default {
  props: {
    json_data: {
      type: Array,
      required: false,
      fits_url: "/HorseHead.fits"
    },
    index: {
      type: Number,
      required: true
    }
  },
  setup(props, { emit }) {
    const scriptContainer = ref(null);

    const tool_result = ref({
      raw_result: mmoda_isgri_result,
    });

    console.log(toRaw(tool_result.value));

    let raw_results = toRaw(tool_result.value);

    const content = ref("");
    const contentType = ref("");

    const lower_kev = ref("");
    const upper_kev = ref("");

    const run_time = ref("");

    const query_parameters = ref("");

    const catalog_data = ref("");

    const logs = ref({});

    const astrovis_iframe = ref(null);

    const isHidden = ref(false);

    const toggleHidden = () => {
      isHidden.value = !isHidden.value;
    };

    const handleRemove = () => {
      emit('remove', props.index);
    };

    console.log(raw_results.raw_result);
    console.log(raw_results.raw_result.products);
    console.log(raw_results.raw_result.products.analysis_parameters);
    console.log(raw_results.raw_result.products.analysis_parameters.E1_keV);
    console.log(raw_results.raw_result.products.session_id);
    console.log(raw_results.raw_result.products.job_id);

    lower_kev.value = toRaw(raw_results.raw_result.products.analysis_parameters.E1_keV);
    upper_kev.value = toRaw(raw_results.raw_result.products.analysis_parameters.E2_keV);

    run_time.value = toRaw(raw_results.raw_result.products.analysis_parameters.T1)

    const loadExternalScript = async () => {
      await nextTick();

      fetch("/mmodagalaxy/dist/scriptdata.html")
        .then(response => response.text())
        .then(htmlContent => {
          const updatedScriptContent = htmlContent.replace("DYNAMIC_ID", scriptContainer.value.id);

          const script = document.createElement("script");
          script.type = "text/javascript";
          script.textContent = updatedScriptContent;

          document.body.appendChild(script);
        })
        .catch(error => console.error("Error loading Bokeh script:", error));
    };

    async function setContent(type) {
      let button_id = '';

      const container = document.querySelector(".container-results");
      const buttons = container.querySelectorAll("button");
      buttons.forEach(button => button.classList.remove("active-button-category"));

      contentType.value = 'text';
      if (type === "js9") {
        button_id = 'button-js9';
        contentType.value = "html";
        content.value = "JS9 Graph";
      } else if (type === "image") {
        button_id = 'button-aladinlite';
        contentType.value = "image";
        content.value = "Image";

        console.log("image");

        /*
        nextTick(async () => {

          const A = await import("aladin-lite-galaxy");

          if (window.A) {
            let aladin = A.aladin("#aladin-lite-div", { showCooGridControl: true });
            aladin.displayFITS(props.fits_url);
            aladin.showCooGrid(true);
          } else {
            console.error("Aladin Lite is not loaded.");
          }
        });
        */


        console.log(window.A);
        //console.log(fits_file)

        /*
        let fitsBlobUrl;

        const response = await fetch(fits_file);
        const blob = await response.blob();
        const base64Content = await blobToBase64(blob);

        const binaryString = atob(base64Content.split(",")[1]);
        const byteArray = new Uint8Array(binaryString.length);
        for (let i = 0; i < binaryString.length; i++) {
          byteArray[i] = binaryString.charCodeAt(i);
        }

        const mimeType = "image/fits";
        const newBlob = new Blob([byteArray], { type: mimeType });
        fitsBlobUrl = URL.createObjectURL(newBlob);
        */

        //if (window.A) {

        console.log("bbbbb");

        A.init.then(() => {
          let aladin = A.aladin("#aladin-lite-div", {showCooGridControl: true});
          console.log(window.location.origin);
          //aladin.displayFITS(props.fits_url);
          aladin.displayFITS(window.location.origin+"/mmodagalaxy/dist/HorseHead.fits");
          //aladin.showCooGrid(true);
        });

        console.log("aaaaa");
        console.log(aladin)
        /*
        } else {
          console.error("Aladin Lite is not loaded.");
        }
        */

      } else if (type === "graph") {
        console.log("Astrovisjs");
        //console.log(Astrovis);

        button_id = 'button-astrovisj';
        contentType.value = "graph";
        content.value = "graph";

        await nextTick();

        //Astrovis.init('astrovisdiv', "http://localhost:5173/mmodagalaxy/dist/IBIS_lc_1E_1145.1-6141_Eta_Carinae_7790003.0.fits");

        const doc = astrovis_iframe.value.contentDocument || iframe.value.contentWindow.document;
        doc.open();
        doc.write(`<!DOCTYPE html>
          <html>
            <head>
              <script src="https://unpkg.com/astrovisjs@latest/dist/astrovis/astrovis.js"></scr` + `ipt>
              <style>
                @media (min-width: 992px) {
                  .container, .container-lg, .container-md, .container-sm {
                    width: 100% !important;
                    max-width: 100% !important;
                  }
                }

                @media (min-width: 768px) {
                  .container, .container-lg, .container-md, .container-sm {
                    width: 100% !important;
                    max-width: 100% !important;
                  }
                }

                @media (min-width: 576px) {
                  .container, .container-lg, .container-md, .container-sm {
                    width: 100% !important;
                    max-width: 100% !important;
                  }
                }
              </style>
            </head>
            <body style="width: 100%; height: 1000px; margin:0;">
            <div id="astrovisdiv" style="width:100%;height:100%;"></div>
            <script>
              window.onload = function() {
                Astrovis.init('astrovisdiv', window.location.origin+"/mmodagalaxy/dist/IBIS_lc_1E_1145.1-6141_Eta_Carinae_7790003.0.fits");
              };
            </scr` + `ipt>
            </body>
          </html>
          `);
        doc.close();

      } else if (type === "download") {
        button_id = 'button-download';
        contentType.value = "text";
        content.value = raw_results.raw_result.products.image.file_path;
      } else if (type === "catalog") {
        button_id = 'button-catalog';
        contentType.value = "catalog";
        catalog_data.value = raw_results.raw_result.products.catalog
      } else if (type === "query_parameters") {
        button_id = 'button-query';
        contentType.value = "parameters";
        query_parameters.value = raw_results.raw_result.products.analysis_parameters
      } else if (type === "log") {
        button_id = 'button-log';
        contentType.value = "logs";
        logs.value = {
          "Session ID": raw_results.raw_result.products.session_id,
          "Job ID": raw_results.raw_result.products.job_id
        }
      } else if (type === "share") {
        button_id = 'button-share';
        contentType.value = "text";
      } else if (type === "api_code") {
        button_id = 'button-api';
        contentType.value = "code";
        content.value = raw_results.raw_result.products.api_code;
      } else if (type === "renku") {
        button_id = 'button-renku';
        contentType.value = "text";
        content.value = "renku";
      }

      document.getElementById(button_id).classList.add("active-button-category");
    }

    onMounted(() => {
      //scriptContainer.value.id = `bokeh-${Date.now()}`;
      //loadExternalScript();

      /*
        fetch("/HorseHead.fits")
            .then((response) => response.json())
            .then((data) => {
              config.value = data;
            })
            .catch((error) => console.error("Error loading JSON:", error));



        if (window.A) {
          A.init.then(() => {
            let aladin = A.aladin("#aladin-lite-div", { showCooGridControl: true });
            aladin.displayFITS(props.fits_url);
            aladin.showCooGrid(true);
          });
        } else {
          console.error("Aladin Lite is not loaded.");
        }
      */
      setContent('query_parameters');
    });

    return {
      //scriptContainer
      content,
      contentType,
      setContent,
      lower_kev,
      upper_kev,
      run_time,
      query_parameters,
      catalog_data,
      logs,
      astrovis_iframe,
      isHidden,
      toggleHidden,
      handleRemove
    };
  },
};
</script>

<style scoped>
.container {
  border: 1px solid #007d64;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 80% !important;
  max-width: 80% !important;
  margin: 10px auto;
}

.result-container {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #FFFFFF;
  font-family: Arial, sans-serif;
  width: 100%;
  height: 50px;
}

.custom-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #007d64;
  border-color: #dddddd;
  color: #000000;
  padding: 0px 5px 0px 10px;
}

.custom-inner-container {
  border: 1px solid #dddddd;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 100%;
  margin: 0 auto;
}

.custom-inner-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f5f5f5;
  border-color: #dddddd;
  color: #000000;
  padding: 20px;
  border-bottom: 1px solid #e7e7e7;
  height: 10px;
}

.header-inner-title {
  margin: 0;
  font-size: 16px;
  font-weight: bold;
}

.container-actions {
  width: fit-content;
  border: none;
  padding: 10px;
  font-size: 16px;
  color: #FFFFFF;
  display: flex;
  align-items: center;
  border-radius: 5px;
}

.action-button {
  margin-right: 10px
}

.span-run-date {
  color: #555555;
  margin-right: 10px;
  font-weight: bold;
}

.container-results {
  display: flex;
  flex-direction: column;
  padding: 20px;
}

.button-row {
  display: flex;
  flex-direction: row;
}

.button-row button {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #FFFFFF;
  border-radius: 0;
  border: 1px solid #999999;
  min-width: 20px;
  width: fit-content;
  height: 25px;
  padding: 20px;
  text-align: center;
  vertical-align: middle;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.container-results button:hover {
  background-color: #DDDDDD;
}

.active-button-category {
  background-color: #007d64 !important;
  color: #FFFFFF;
}

#inner-container-results {
  width: 98%;
  padding: 10px;
  border: 1px solid #999999;
  background-color: #f9f9f9;
  min-height: 50px;
  margin-top: 10px;
}

.catalog-container {
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  margin-top: 15px;
}

.catalog-section {
  margin-bottom: 20px;
  padding: 15px;
  border: 1px solid #ddd;
  background: #ffffff;
  border-radius: 6px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.catalog-title {
  font-size: 18px;
  color: #007d64;
  border-bottom: 2px solid #007d64;
  padding-bottom: 5px;
  margin-bottom: 10px;
}

.catalog-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
}

.catalog-header {
  background-color: #007d64;
  color: white;
  padding: 10px;
  text-align: left;
  border: 1px solid #ddd;
}

.catalog-row:nth-child(even) {
  background-color: #f2f2f2;
}

.catalog-cell {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

.catalog-list {
  list-style-type: none;
  padding: 0;
  margin-top: 10px;
}

.catalog-list-item {
  background: #e6f5f0;
  padding: 8px;
  margin-bottom: 5px;
  border-radius: 4px;
}

.catalog-info {
  background: #f5f5f5;
  padding: 10px;
  border-left: 4px solid #007d64;
  border-radius: 4px;
}

.parameters-list {
  list-style-type: none;
  padding: 0;
  margin-top: 10px;
  background: #f9f9f9;
  padding: 15px;
  border-radius: 8px;
  border: 1px solid #ddd;
}

.parameters-list-item {
  padding: 10px;
  margin-bottom: 5px;
  background: #e6f5f0;
  border-radius: 6px;
  border-left: 4px solid #007d64;
  display: flex;
}

.parameter-key {
  font-weight: bold;
  color: #007d64;
}

.parameter-value {
  color: #444;
  font-weight: bold;
  margin-left: 1%;
}

.custom-highlight {
  background-color: #282c34;
  color: #ffffff;
  padding: 10px;
  border-radius: 5px;
  font-family: monospace;
  display: block;
  overflow-x: auto;
  white-space: pre-wrap;
}

.custom-highlight .tag {
  color: #ffa500;
}

.custom-highlight .attr {
  color: #87cefa;
}

.custom-highlight .string {
  color: #98c379;
}

#aladin-lite-div {
  width: 100%;
  height: 500px;
  border: 1px solid #ddd;
  background-color: black;
}

* {
  user-select: none;
}

</style>