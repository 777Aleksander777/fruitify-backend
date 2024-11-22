import type { Schema, Struct } from '@strapi/strapi';

export interface ElementsLink extends Struct.ComponentSchema {
  collectionName: 'components_elements_links';
  info: {
    displayName: 'Link';
  };
  attributes: {
    adres: Schema.Attribute.String & Schema.Attribute.Required;
    jestZewnetrzny: Schema.Attribute.Boolean &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<false>;
    nazwa: Schema.Attribute.String;
  };
}

export interface ElementsLogoLink extends Struct.ComponentSchema {
  collectionName: 'components_elements_logo_links';
  info: {
    displayName: 'LogoLink';
  };
  attributes: {
    adres: Schema.Attribute.String & Schema.Attribute.Required;
    nazwa: Schema.Attribute.String;
    zdjecie: Schema.Attribute.Media<'images'> & Schema.Attribute.Required;
  };
}

export interface ElementsVideo extends Struct.ComponentSchema {
  collectionName: 'components_elements_videos';
  info: {
    description: '';
    displayName: 'Video';
  };
  attributes: {
    nazwa: Schema.Attribute.String & Schema.Attribute.Required;
    video: Schema.Attribute.Media<'videos'> & Schema.Attribute.Required;
  };
}

export interface LayoutNaglowek extends Struct.ComponentSchema {
  collectionName: 'components_layout_nagloweks';
  info: {
    displayName: 'Naglowek';
  };
  attributes: {
    cta: Schema.Attribute.Component<'elements.link', true> &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMax<
        {
          max: 3;
          min: 1;
        },
        number
      >;
    linki: Schema.Attribute.Component<'elements.link', true> &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      >;
    logo: Schema.Attribute.Component<'elements.logo-link', false> &
      Schema.Attribute.Required;
  };
}

export interface LayoutPromowane extends Struct.ComponentSchema {
  collectionName: 'components_layout_promowanes';
  info: {
    description: '';
    displayName: 'Promowane';
  };
  attributes: {
    nazwa: Schema.Attribute.String & Schema.Attribute.Required;
    produkt: Schema.Attribute.Component<'utilities.produtk-ref', true>;
  };
}

export interface LayoutPytania extends Struct.ComponentSchema {
  collectionName: 'components_layout_pytanias';
  info: {
    displayName: 'Pytania';
  };
  attributes: {
    nazwa: Schema.Attribute.String & Schema.Attribute.Required;
    pytaniaIOdpowiedzi: Schema.Attribute.Component<
      'utilities.pytania-i-odpowiedzi',
      true
    >;
  };
}

export interface LayoutPytaniaIOdpowiedzi extends Struct.ComponentSchema {
  collectionName: 'components_layout_pytania_i_odpowiedzis';
  info: {
    description: '';
    displayName: 'PytaniaIOdpowiedzi';
  };
  attributes: {
    nazwa: Schema.Attribute.String & Schema.Attribute.Required;
    pytaniaIOdpowiedzi: Schema.Attribute.Component<
      'utilities.pytania-i-odpowiedzi',
      true
    >;
  };
}

export interface LayoutStopka extends Struct.ComponentSchema {
  collectionName: 'components_layout_stopkas';
  info: {
    displayName: 'Stopka';
  };
  attributes: {
    linki: Schema.Attribute.Component<'elements.link', true> &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      >;
    logo: Schema.Attribute.Component<'elements.logo-link', false> &
      Schema.Attribute.Required;
    tekst: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface UtilitiesProdutkRef extends Struct.ComponentSchema {
  collectionName: 'components_utilities_produtk_refs';
  info: {
    displayName: 'ProdutkRef';
  };
  attributes: {
    produkty: Schema.Attribute.Relation<'oneToOne', 'api::produkty.produkty'>;
  };
}

export interface UtilitiesPytaniaIOdpowiedzi extends Struct.ComponentSchema {
  collectionName: 'components_utilities_pytania_i_odpowiedzis';
  info: {
    displayName: 'PytaniaIOdpowiedzi';
  };
  attributes: {
    odpowiedz: Schema.Attribute.Text & Schema.Attribute.Required;
    pytanie: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'elements.link': ElementsLink;
      'elements.logo-link': ElementsLogoLink;
      'elements.video': ElementsVideo;
      'layout.naglowek': LayoutNaglowek;
      'layout.promowane': LayoutPromowane;
      'layout.pytania': LayoutPytania;
      'layout.pytania-i-odpowiedzi': LayoutPytaniaIOdpowiedzi;
      'layout.stopka': LayoutStopka;
      'utilities.produtk-ref': UtilitiesProdutkRef;
      'utilities.pytania-i-odpowiedzi': UtilitiesPytaniaIOdpowiedzi;
    }
  }
}
