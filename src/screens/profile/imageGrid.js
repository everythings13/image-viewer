import React, {Component} from 'react';
import {GridListTile, GridList,} from "@material-ui/core";

export default class ImageGrid extends Component {
    render() {
        const {posts} = this.props;
        return <React.Fragment>
            <GridList cellHeight={150} cols={3}>
                {posts.map(post =>
                    <GridListTile key={post.id} cols={1}>
                        <img src={post.images.standard_resolution.url} alt="image"/>
                    </GridListTile>)}
            </GridList>
        </React.Fragment>;
    }
}
