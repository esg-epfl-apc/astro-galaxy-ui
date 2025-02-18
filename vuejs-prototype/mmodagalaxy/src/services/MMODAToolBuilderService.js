import { h, reactive } from "vue";

export class MMODAToolBuilderService {
    constructor(tool_description) {
        this.tool_parameters = tool_description[0][3];

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

    determineInputType(param) {
        if (param.owl_uri?.includes("http://www.w3.org/2001/XMLSchema#int")) {
            return "number";
        }
        if (param.owl_uri?.includes("http://odahub.io/ontology#Angle")) {
            return "number";
        }
        if (param.owl_uri?.includes("http://odahub.io/ontology#TimeInstant")) {
            return "datetime-local";
        }
        return "text";
    }
}