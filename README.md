# Sheets CMS

To use the script, insert this HTML:

```html
<script src="path-to-script" async></script>
```

On the page, you can create as many "templates" as you'd like. A template is an HTML element with the `data-sheets-cms` attribute, like so:

```html
<div
  data-sheets-cms="1QJV22qqxqExVbt6IcxZ-4sVPs728Im7jKo9kWxe9yQc,Sheet1"
></div>
```

The `data-sheets-cms` attribute is comprised of the Google Sheet ID (which can be found in the URL), a comma, and then the name of the tab in the spreadsheet that should be used.

Within the template, use the `data-sheets-cms-column` attribute to specify to create placeholders for data in specific columns.

```html
<div data-sheets-cms="1QJV22qqxqExVbt6IcxZ-4sVPs728Im7jKo9kWxe9yQc,Sheet1">
  <h1 data-sheets-cms-column="City"></h1>
  <p data-sheets-cms-column="Nickname"></p>
</div>
```

This template will be copied as many times as there are rows in the Google Sheet, and they'll be rendered in the same parent component as the template.

## Images

Images are also supported. If you use an `img` element, the script will replace the `src` attribute, not the text inside the element.

```html
<div data-sheets-cms="1QJV22qqxqExVbt6IcxZ-4sVPs728Im7jKo9kWxe9yQc,Sheet1">
  <img data-sheets-cms-column="Cover Image" />
</div>
```

## Loading Indicator

You can use `data-sheets-cms-loading` to add a loading indicator anywhere on the page that will show up until _all_ templates have finished loading.

```html
<div data-sheets-cms-loading>
  <svg></svg>
  <p>Loading...</p>
</div>
```

## Header Rows

If the first row of your spreadsheet isn't the header row, you can specify that using the `data-sheets-cms-header-row` on the template element.

```html
<div
  data-sheets-cms="1QJV22qqxqExVbt6IcxZ-4sVPs728Im7jKo9kWxe9yQc,Sheet1"
  data-sheets-cms-header-row="2"
></div>
```

## Refreshing

You can refresh the data for a certain template on an interval using the `data-sheets-cms-refresh` attribute.

The attribute accepts values in seconds (`s`) and minutes (`m`).

```html
<div
  data-sheets-cms="1QJV22qqxqExVbt6IcxZ-4sVPs728Im7jKo9kWxe9yQc,Sheet1"
  data-sheets-cms-refresh="30s"
></div>
```

```html
<div
  data-sheets-cms="1QJV22qqxqExVbt6IcxZ-4sVPs728Im7jKo9kWxe9yQc,Sheet1"
  data-sheets-cms-refresh="2m"
></div>
```
