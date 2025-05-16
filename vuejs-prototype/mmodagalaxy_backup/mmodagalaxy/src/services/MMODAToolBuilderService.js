import { h, reactive } from "vue";

export class MMODAToolBuilderService {
    constructor(tool_description) {
        this.tool_parameters = tool_description[0][3];

        this.tool_prod_dict = tool_description[0][1]['prod_dict'];

        this.tool_query_dict = this.get_prod_dict_queries(tool_description)

        console.log(this.tool_prod_dict);
        console.log(this.tool_query_dict);

        this.templateData = reactive({ tool_description });

        console.log(this.tool_parameters);
    }

    generateRenderFunction() {
        const formatName = (name) => {
            if (!name) return null;
            return name
                .replace(/_/g, " ")
                .replace(/\b\w/g, (char) => char.toUpperCase());
        };

        return () => {
            return h("div", {}, [

                this.tool_prod_dict && Object.keys(this.tool_prod_dict).length > 0
                    ? h("div", { style: "margin-bottom: 1em; padding-bottom: 1em; border-bottom: 1px solid #ddd;" }, [
                        h("label", { style: "display: block; font-weight: bold; margin-bottom: 0.5em;" }, "Select Product"),
                        ...Object.entries(this.tool_prod_dict).map(([key, value]) =>
                            h("div", { style: "margin-bottom: 0.5em;" }, [
                                h("input", {
                                    type: "radio",
                                    name: "product_type",
                                    id: key,
                                    value: value.replace(/_query$/, ""),
                                    checked: this.selected_product === value.replace(/_query$/, ""),
                                    onChange: (event) => (this.selected_product = event.target.value),
                                }),
                                h("label", { for: key, style: "margin-left: 0.5em; cursor: pointer;" }, formatName(key))
                            ])
                        )
                    ])
                    : null,

                ...this.tool_parameters
                    .filter((param) => param.name)
                    .map((param) => {
                        const hasAllowedValues = param.restrictions?.allowed_values;

                        return h("div", {
                            style: "margin-bottom: 1em; border-bottom: 1px solid #ddd; padding-bottom: 1em;",
                        }, [
                            h(
                                "label",
                                { for: param.name, style: "display: block; margin-bottom: 0.5em; font-weight: bold;" },
                                `${formatName(param.name)} (${param.units || ""})`
                            ),
                            hasAllowedValues
                                ? h(
                                    "select",
                                    {
                                        id: param.name,
                                        value: param.value,
                                        onChange: (event) => (param.value = event.target.value),
                                        style: "padding: 0.5em; border: 1px solid #ccc; border-radius: 4px;",
                                    },
                                    param.restrictions.allowed_values.map((value) =>
                                        h("option", { value }, value)
                                    )
                                )
                                : h("input", {
                                    id: param.name,
                                    type: this.determineInputType(param),
                                    value: param.value,
                                    onInput: (event) => (param.value = event.target.value),
                                    placeholder: param.optional ? "Optional" : "Required",
                                    style: "padding: 0.5em; border: 1px solid #ccc; border-radius: 4px;",
                                }),
                        ]);
                    }),

                ...Object.entries(this.tool_query_dict).map(([queryName, queryData]) =>
                    h("fieldset", {
                        style: `margin-bottom: 2em; border: 1px solid #ccc; padding: 1em; border-radius: 4px;};`,
                        class: 'query_fieldset',
                        id: queryName,
                    }, [
                        h("legend", { style: "font-weight: bold;" }, formatName(queryName)),

                        ...queryData.parameters.map((param) => {
                            const hasAllowedValues = param.restrictions?.allowed_values;
                            const isFileInput = param.name === "selected_catalog" || param.name === "user_catalog";

                            return h("div", {
                                style: "margin-bottom: 1em; border-bottom: 1px solid #ddd; padding-bottom: 1em;",
                            }, [
                                h(
                                    "label",
                                    { for: param.name, style: "display: block; margin-bottom: 0.5em; font-weight: bold;" },
                                    `${formatName(param.name)} (${param.units || ""})`
                                ),
                                isFileInput
                                    ? h("input", {
                                        id: param.name,
                                        type: "file",
                                        onChange: (event) => {
                                            const file = event.target.files[0];
                                            param.value = file ? file.name : null;
                                        },
                                        style: "padding: 0.5em; border: 1px solid #ccc; border-radius: 4px;",
                                    })
                                    : hasAllowedValues
                                        ? h(
                                            "select",
                                            {
                                                id: param.name,
                                                value: param.value,
                                                onChange: (event) => (param.value = event.target.value),
                                                style: "padding: 0.5em; border: 1px solid #ccc; border-radius: 4px;",
                                            },
                                            param.restrictions.allowed_values.map((value) =>
                                                h("option", { value }, value)
                                            )
                                        )
                                        : h("input", {
                                            id: param.name,
                                            type: this.determineInputType(param),
                                            value: param.value,
                                            onInput: (event) => (param.value = event.target.value),
                                            placeholder: param.optional ? "Optional" : "Required",
                                            style: "padding: 0.5em; border: 1px solid #ccc; border-radius: 4px;",
                                        }),
                            ]);
                        })
                    ])
                )

            ]);
        };
    }

    generateToolHTML() {
        return `
      <div>
        ${this.tool_parameters
            .map(
                (param) => `
          <div class="form-group" style="margin-bottom: 1em;">
            <label for="${param.name}" style="display: block;">
              ${param.name} (${param.units || "N/A"})
            </label>
            <input
              id="${param.name}"
              type="${this.determineInputType(param)}"
              value="${param.value || ""}"
              placeholder="${param.optional ? "Optional" : "Required"}"
              class="form-control"
            />
          </div>
        `
            )
            .join("")}
      </div>
    `;
    }

    get_prod_dict_queries(jsonData) {
        const prodDict = jsonData[0]?.find(item => item.prod_dict)?.prod_dict || {};
        const queryArrays = jsonData[0]?.filter(Array.isArray) || [];

        return Object.values(prodDict).reduce((acc, prodValue) => {
            const matchingArray = queryArrays.find(queryArray =>
                queryArray.some(obj => obj.query_name === prodValue)
            );

            if (matchingArray) {
                const queryInfo = matchingArray.find(obj => obj.query_name);
                const productInfo = matchingArray.find(obj => obj.product_name);
                const parameters = matchingArray.filter(obj =>
                    !("query_name" in obj) && !("product_name" in obj)
                );

                acc[prodValue] = {
                    query_name: queryInfo?.query_name || null,
                    product_name: productInfo?.product_name || null,
                    parameters: parameters
                };
            }

            return acc;
        }, {});
    }

    determineInputType(param) {
        if(param.owl_uri?.includes("http://www.w3.org/2001/XMLSchema#int")) {
            return "number";
        }

        if(param.owl_uri?.includes("http://odahub.io/ontology#Angle")) {
            return "number";
        }

        if(param.owl_uri?.includes("http://odahub.io/ontology#TimeInstant")) {
            return "datetime-local";
        }

        if(param.name.includes("user_catalog")) {
            return "file"
        }

        return "text";
    }
}