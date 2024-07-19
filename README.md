# Liturgical Anniversary Calculator
This frontend is a [Next.js](https://nextjs.org/) application using Yarn v4.

After cloning the repo, you must run `corepack enable` in the project folder in order to be able to use the local yarn.

Then run `yarn install` to install dependencies.

## Getting Started

Run the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

To build the project to static resources that can be uploaded to a remote server, run:

```bash
yarn build
````

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Translating

This frontend application is using Next I18n for translations. There are two namespaces:

* `translation`: this is for all of the UI elements in the application
* `anniversary`: this is specifically for the names of anniversaries

Because there are two namespaces, there are also two translation components on our weblate service (click on either image to go the translation page):

| translation ns | anniversary ns |
|----------------|----------------|
| [![Translation status](https://translate.johnromanodorazio.com/widget/liturgical-calendar/anniversary-calculator-frontend/multi-auto.svg)](https://translate.johnromanodorazio.com/engage/liturgical-calendar/) | [![Translation status](https://translate.johnromanodorazio.com/widget/liturgical-calendar/anniversary-calculator-frontend2/multi-auto.svg)](https://translate.johnromanodorazio.com/engage/liturgical-calendar/) |

However the data that is displayed for each anniversary event cannot be translated on the frontend application, this data comes from the [backend](https://github.com/Liturgical-Calendar/LitCalAnniversaryCalculator) and must be translated in the translation components for the backend. The backend also has two translation components, one for common strings (error messages and translations of the anniversary 'type'); the other for the actual data for each event.

| common | event data |
|----------------|----------------|
| [![Translation status](https://translate.johnromanodorazio.com/widget/liturgical-calendar/anniversary-calculator/multi-auto.svg)](https://translate.johnromanodorazio.com/engage/liturgical-calendar/) | [![Translation status](https://translate.johnromanodorazio.com/widget/liturgical-calendar/liturgical-anniversary-calculator-data/multi-auto.svg)](https://translate.johnromanodorazio.com/engage/liturgical-calendar/) |

