# Grafana Status Dot

A status dot panel for [Grafana](http://grafana.org/).

![Status Dot Panel](https://raw.githubusercontent.com/BT-OpenSource/bt-grafana-status-dot/master/src/img/status_dot.png)

This panel shows a colored dot for each series. This is is useful if you want to monitor their status (i.e. latest value). Options for this panel include variable radius, precision and units (for the tooltip) and color thresholds for the value.

## Values

A separate tab allows you to customize how the display and color values are calculated for each dot, using [mathjs](http://mathjs.org).

![Status Dot Values](https://raw.githubusercontent.com/BT-OpenSource/bt-grafana-status-dot/master/src/img/status_dot_values.png)

The initial scope includes a `data` array, which is set to the compacted (no nulls) values of the series for each dot.

## Links

A further tab allows you to specify the hyperlink for each dot using variables derived from the name of its series.

![Status Dot Links](https://raw.githubusercontent.com/BT-OpenSource/bt-grafana-status-dot/master/src/img/status_dot_links.png)

The variables are set by splitting the series name on each . character and finding the value at the specified index.

## Compatibility

This panel should work with the following data sources: [Graphite](https://grafana.net/plugins/graphite)

## Development

[Docker](https://www.docker.com/) is an easy way to spin-up an instance of Grafana. With docker installed, run the following command in the directory containing the plugin; this will expose the local plugin on your machine to the Grafana container so you can test it out.

    docker run -it -v $PWD:/var/lib/grafana/plugins/status_dot -p 3000:3000 --name grafana.docker grafana/grafana

Now do this...

    # Install development packages
    npm install

    # Install the grunt-cli
    sudo npm install -g grunt-cli

    # Compile into dist/
    grunt

    # Restart Grafana to see it
    docker restart grafana.docker

    # Watch for changes (requires refresh)
    grunt watch

Use `grunt test` to run the Jasmine tests for the plugin; and `grunt eslint` to check for style issues. Note that the plugin controller isn't tested because it depends on Grafana native libraries, which aren't available outside of Grafana.

## Contributing

For bugs and new features, open an issue and we'll take a look. If you want to contribute to the plugin, you're welcome to submit a pull request - just make sure `grunt` runs without errors first.
