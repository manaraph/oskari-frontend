Oskari.registerLocalization(
    {
        "lang": "fi",
        "key": "admin-layereditor",
        "value": {
            "wizard": {
                "type": "Tason tyyppi",
                "service": "Rajapinta",
                "layers": "Karttatasot",
                "typeDescription": "Valitse lisättävän rajapinnan tyyppi",
                "serviceDescription": "Syötä lisättävän rajapinnan osoite ja versionumero",
                "layersDescription": "Valitse rajapinnasta löytyvistä tasoista se jonka haluat lisätä karttatasoksi",
                "details": "Tason tiedot"
            },
            "editor-tool": "Muokkaa tasoa",
            "flyout-title": "Karttatasohallinta",
            "generalTabTitle": "Yleiset",
            "visualizationTabTitle": "Visualisointi",
            "additionalTabTitle": "Lisätiedot",
            "permissionsTabTitle": "Oikeudet",
            "interfaceAddress": "Rajapinnan osoite",
            "username": "Käyttäjätunnus",
            "password": "Salasana",
            "usernameAndPassword": "Käyttäjätunnus ja salasana",
            "uniqueName": "Karttatason yksilöivä nimi",
            "generic": {
                "placeholder": "Nimi kielellä {0}",
                "descplaceholder": "Kuvaus kielellä {0}"
            },
            "en": {
                "lang": "Englanti",
                "placeholder": "Nimi englanniksi",
                "descplaceholder": "Kuvaus englanniksi"
            },
            "fi": {
                "lang": "Suomi",
                "placeholder": "Nimi suomeksi",
                "descplaceholder": "Kuvaus suomeksi"
            },
            "sv": {
                "lang": "Ruotsi",
                "placeholder": "Nimi ruotsiksi",
                "descplaceholder": "Kuvaus ruotsiksi"
            },
            "addLayer": "Lisää uusi karttataso",
            "dataProvider": "Tiedontuottaja",
            "dataProviderName": "Tiedontuottajan nimi",
            "addDataProvider": "Lisää tiedontuottaja",
            "themeName": "Teeman nimi",
            "addTheme": "Lisää teema",
            "editTheme" : "Muokkaa teemaa",
            "editDataProvider": "Muokkaa tiedontuottajaa",
            "mapLayerGroups": "Tason ryhmät",
            "selectMapLayerGroupsButton": "Valitse ryhmät",
            "cancel": "Peruuta",
            "ok": "Ok",
            "add": "Lisää",
            "save": "Tallenna",
            "delete": "Poista",
            "opacity": "Peittävyys",
            "style": "Oletustyyli",
            "styleDesc": "Valitse listalta, mitä tyyliä käytetään oletusarvoisesti karttanäkymissä. Käyttäjä voi vaihtaa tyyliä ”Valitut tasot”-valikon kautta.",
            "styleDescCapabilities": "Tyylit määritellään GetCapabilities-vastausviestin wms:Style-elementissä, josta ne haetaan valintalistalle.",
            "selectedTime": "Valittu aika",
            "realtime": "Reaaliaikataso",
            "realtimeDesc": "Klikkaa valituksi, jos kyseessä on reaaliaikaisesti päivittyvä karttataso. Karttatason virkistystaajuus määritellään sekunteina.",
            "refreshRate": " Virkistystaajuus sekunteina",
            "capabilitiesUpdateRate": "Capabilities päivitystiheys",
            "capabilitiesUpdateRateDesc": "Päivitystiheys sekunteina",
            "minScale": "Pienin mittakaava",
            "maxScale": "Suurin mittakaava",
            "minAndMaxScale": "Pienin ja suurin mittakaava",
            "metadataIdDesc": "Metatiedon tiedostotunniste on XML-muotoisen metatietotiedoston tiedostotunniste. Se haetaan automaattisesti GetCapabilities-vastausviestistä.",
            "metadataId": "Metatiedon tiedostotunniste",
            "gfiContent": "Kohdetietoikkunan lisäsisältö",
            "gfiType": "GFI-vastaustyyppi",
            "gfiTypeDesc": "Valitse listalta formaatti, jossa kohdetiedot (GFI) haetaan. Mahdolliset formaatit on määritelty WMS-palvelun GetCapabilities-vastausviestissä.",
            "gfiStyle": "GFI-tyyli (XSLT)",
            "gfiStyleDesc": "Määrittele kohdetietojen esitystapa XSLT-muunnoksen avulla.",
            "attributes": "Attribuutit",
            "clusteringDistance": "Pisteiden etäisyys klusteroidessa",
            "legendImage": "Oletuskarttaselite",
            "legendImageDesc": "URL-osoite karttaselitteelle, joka näytetään tyyleillä, joilla ei palvelussa ole määritelty karttaselitettä",
            "legendImagePlaceholder": "URL-osoite karttaselitteelle, joka näytetään tyyleillä, joilla ei palvelussa ole määritelty karttaselitettä",
            "forcedSRS": "Pakotetut projektiot",
            "forcedSRSInfo": "Pakotetut projektiot verrattuna GetCapabilites-määritykseen",
            "supportedSRS": "Tuetut projektiot",
            "missingSRS": "Puuttuvat projektiot",
            "missingSRSInfo": "Sovelluksen oletusnäkymien projektiot, joita taso ei tue",
            "renderMode": {
                "title": "Sisällön tyyppi",
                "mvt": "Paljon pieniä kohteita",
                "geojson": "Suuria kohteita",
                "info": "Pienten kohteiden esittämistä on optimoitu. Tämä rajoittaa mittakaavatasoja, joilla kohteet näytetään."
            },
            "validation": {
                "styles" : "Tyylimääritysten JSON-syntaksi on virheellinen.",
                "externalStyles" : "Kolmannen osapuolen tyylimääritysten JSON-syntaksi on virheellinen.",
                "hover" : "Kohteen korostus ja tooltip JSON-syntaksi on virheellinen.",
                "attributes" : "Attribuutit kentän JSON-syntaksi on virheellinen."
            },
            "messages": {
                "saveSuccess": "Tallennettu",
                "saveFailed": "Järjestelmässä tapahtui virhe. Tietoja ei ole tallennettu.",
                "confirmDeleteLayer": "Karttataso poistetaan. Haluatko jatkaa?",
                "errorRemoveLayer": "Karttatason poisto ei onnistunut.",
                "errorInsertAllreadyExists": "Uusi karttataso on lisätty. Samalla tunnisteella on jo olemassa karttataso.",
                "errorFetchUserRolesAndPermissionTypes": "Käyttäjäroolien ja käyttöoikeustyyppien haku ei onnistunut",
                "errorFetchCapabilities": "Rajapinnan tietojen haku epäonnistui.",
                "unauthorizedErrorFetchCapabilities": "Palvelu vaatii käyttäjätunnuksen ja salasanan."
            },
            "otherLanguages": "Muut kielet",
            "stylesJSON": "Tyylimääritykset (JSON)",
            "externalStylesJSON": "Kolmannen osapuolen tyylimääritykset (JSON)",
            "externalStyleFormats": "Tuetut muodot:\n3D Tiles, Mapbox\n",
            "hoverJSON": "Kohteen korostus ja tooltip (JSON)",
            "rights": {
                "PUBLISH": "Julkaisuoikeus",
                "VIEW_LAYER": "Katseluoikeus",
                "DOWNLOAD": "Latausoikeus",
                "VIEW_PUBLISHED": "Katseluoikeus upotetussa kartassa",
                "role": "Rooli"
            }
        }
    }
);