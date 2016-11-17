# Grafana Trend Dot

A trend dot panel for [Grafana](http://grafana.org/).

![Trend Dot Panel](https://raw.githubusercontent.com/BTplc/grafana-trend-dot/master/src/img/trend_dot.png)

## Overview

This panel shows a dot for each series, where each dot is colored based on the percentage change between the first and last values of that series. This is is useful if you want to monitor a collection of values as they change over time. Options for this panel include variable radius, precision and units (for the tooltip) and color thresholds for the percentage change.

## Compatibility

This panel should work with the following data sources: [Graphite](https://grafana.net/plugins/graphite)

## Development

[Docker](https://www.docker.com/) is an easy way to spin-up an instance of Grafana. With docker installed, run the following command in the directory containing the plugin; this will expose the local plugin on your machine to the Grafana container so you can test it out.

    docker run -it -v $PWD:/var/lib/grafana/plugins/trend_dot -p 3000:3000 --name grafana.docker grafana/grafana

Now do this...

    # Install development packages
    npm install

    # Compile into dist/
    grunt

    # Restart Grafana to see it
    docker restart grafana.docker

    # Watch for changes (requires refresh)
    grunt watch

Use `grunt test` to run the Jasmine tests for the plugin; and `grunt eslint` to check for style issues. Note that the plugin controller isn't tested because it depends on Grafana native libraries, which aren't available outside of Grafana.

## Contributing

For bugs and new features, open an issue and we'll take a look. If you want to contribute to the plugin, you're welcome to submit a pull request - just make sure `grunt` runs without errors first.
