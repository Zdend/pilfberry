import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { getAreaRoutes } from '../../reducers/selectors';
import { dashRevert } from '../../../../shared/utils/string';
import MetaTag from '../../components/structure/meta';

class AreasPage extends Component {

    render() {
        const { suburbs } = this.props;
        const sortedSuburbs = suburbs.sortBy(s => s.get('count')).reverse();
        return (
            <Grid>
                <MetaTag title="Restaurants in Sydney" description="Find restaurants by suburbs" />
                <Row>
                    <Col sm={12}>
                        <h1 className="page-title">Restaurants in Sydney</h1>
                        <ul>
                            {sortedSuburbs.valueSeq().map(suburb => <li key={suburb.get('url')}>
                                <Link to={`/area/${suburb.get('url')}`}>{dashRevert(suburb.get('url'))} ({suburb.get('count')})</Link></li>
                            )}
                        </ul>

                        <div className="margin-top-2x margin-bottom-2x"><Link to="/"><i className="fa fa-chevron-left margin-right-05x" /> Back</Link></div>
                    </Col>
                </Row>
            </Grid>

        );
    }

}


const mapStateToProps = (state) => {
    return {
        suburbs: getAreaRoutes(state)
    };
};


export default connect(mapStateToProps, {})(AreasPage);