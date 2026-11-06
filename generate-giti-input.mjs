import fs from 'node:fs';

const comfortAndWeather = `
205/50R17 215/50R17 215/55R17 215/55R18 215/60R17 215/65R17
225/40R18 225/45R18 225/50R17 225/50R18 225/55R17 225/55R18 225/55R19 225/60R17 225/60R18 225/65R17
235/40R19 235/45R18 235/45R19 235/50R18 235/50R19 235/55R17 235/55R18 235/55R19 235/55R20 235/60R17 235/60R18 235/65R17 235/65R18
245/40R18 245/40R19 245/45R18 245/45R19 245/45R20 245/50R20 245/55R19 245/60R18
255/45R20 255/50R19 255/50R20 255/55R20 265/45R20 265/50R20`;

const xcursionAt = `
225/65R17 235/65R17 235/75R15 XL 245/60R18 245/65R17 XL 245/75R16 255/70R17 255/70R18
265/50R20 XL 265/60R18 265/65R17 265/65R18 265/70R16 265/70R17 265/75R16
275/55R20 XL 275/60R20 275/65R18 285/45R22 XL 285/70R17 35X12.50R18LT 35X12.50R20LT
LT225/75R16 LT235/80R17 LT245/70R17 LT245/75R16 LT245/75R17 LT265/60R20 LT265/70R17 LT265/70R18 LT265/75R16
LT275/55R20 LT275/60R20 LT275/65R18 LT275/65R20 LT275/70R18 LT285/60R20 LT285/70R17 LT285/75R16`;

const xcursionXt = `
265/65R18 265/70R17 275/55R20 XL 275/60R20 275/65R18 285/45R22 XL
33X12.50R18LT 33X12.50R20LT 35X12.50R17LT 35X12.50R18LT 35X12.50R20LT 35X12.50R22LT
LT235/80R17 LT245/70R17 LT245/75R16 LT245/75R17 LT265/60R20 LT265/70R17 LT265/70R18 LT265/75R16
LT275/55R20 LT275/60R20 LT275/65R18 LT275/65R20 LT275/70R18 LT285/60R20 LT285/65R18 LT285/70R17 LT295/70R18 LT315/70R17`;

function sizes(text) {
  const tokens = text.trim().split(/\s+/);
  const result = [];
  for (let i = 0; i < tokens.length; i += 1) {
    let value = tokens[i];
    if (tokens[i + 1] === 'XL') value += ' XL', i += 1;
    result.push(value);
  }
  return [...new Set(result)];
}

const groups = [
  ['GitiComfort XA1', sizes(comfortAndWeather)],
  ['WeatherSmart', sizes(comfortAndWeather)],
  ['XCURSION AT', sizes(xcursionAt)],
  ['XCURSION XT', sizes(xcursionXt)]
];

const lines = ['Brand+Product\tRawsize'];
for (const [product, productSizes] of groups) {
  for (const size of productSizes) lines.push(`${product}\t${size}`);
}
fs.writeFileSync('input.tsv', `${lines.join('\r\n')}\r\n`, 'utf8');
fs.writeFileSync('giti-map.csv', 'Brand+Product,Rawsize,MAP\r\n', 'utf8');
console.log(`Wrote ${lines.length - 1} product-size requests.`);
