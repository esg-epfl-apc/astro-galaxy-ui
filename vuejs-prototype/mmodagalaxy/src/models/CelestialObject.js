class CelestialObject {
    constructor(
        title,
        alternativeNamesLongStr = null,
        nid = null,
        sourceDec = null,
        sourceRa = null,
        url = null,
        urlPreview = null
    ) {
        this._title = title;
        this._alternativeNamesLongStr = alternativeNamesLongStr;
        this._nid = nid;
        this._sourceDec = sourceDec;
        this._sourceRa = sourceRa;
        this._url = url;
        this._urlPreview = urlPreview;
    }

    get title() {
        return this._title;
    }
    set title(value) {
        this._title = value;
    }

    get alternativeNamesLongStr() {
        return this._alternativeNamesLongStr;
    }
    set alternativeNamesLongStr(value) {
        this._alternativeNamesLongStr = value;
    }

    get nid() {
        return this._nid;
    }
    set nid(value) {
        this._nid = value;
    }

    get sourceDec() {
        return this._sourceDec;
    }
    set sourceDec(value) {
        this._sourceDec = value;
    }

    get sourceRa() {
        return this._sourceRa;
    }
    set sourceRa(value) {
        this._sourceRa = value;
    }

    get url() {
        return this._url;
    }
    set url(value) {
        this._url = value;
    }

    get urlPreview() {
        return this._urlPreview;
    }
    set urlPreview(value) {
        this._urlPreview = value;
    }

    getAlternativeNamesArray() {
        if (!this._alternativeNamesLongStr) return null;
        return this._alternativeNamesLongStr.split(',').map(name => name.trim());
    }

    getCoordinates() {
        if (this._sourceRa === null || this._sourceDec === null) return null;
        return {
            ra: parseFloat(this._sourceRa),
            dec: parseFloat(this._sourceDec),
        };
    }
}
