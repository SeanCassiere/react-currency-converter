# React Currency-Converter

To fully utilize this project, you'll need to generate a **free API key** from https://www.exchangerate-api.com.

Once obtained please, add it into the `.env` file, following templated after `.env.example`.

## Using the Open API vs the Authenticated API

In the following directory

```
src/components/ExchangeCard.js
```

You'll need to select which version you are using.

Select the appropriate URL and State Setter from the commented code, and replace them on Lines `68` and `73`.

** If you use the **Open API**, then the currency conversion shall always be considered to be converted from **USD\*\*.
