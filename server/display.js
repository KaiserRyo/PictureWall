/*
 *  Copyright 2011 Research In Motion Limited.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var grid = [];

module.exports = {
    init: function (g) {
        grid = g;
    },

    render: function (plugin, io) {
        var plugin = require("./display/" + plugin),
            row, col;

        plugin.init();

        if (io) {
            io.sockets.clients().forEach(function (s) {
                s.emit('img', plugin.render());
            });
        }
        else {
            for (row = 0; row < grid.length; row++) {
                for (col = 0; col < grid[row].length; col++) {
                    grid[row][col].emit('img', plugin.render(row, col));
                }
            }
        }
    }
};
