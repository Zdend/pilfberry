import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Row, Col } from 'react-bootstrap';
import Helmet from 'react-helmet';
import { Link } from 'react-router-dom';
import { getAreaRoutes } from '../reducers/selectors';
import { dashRevert } from '../../../shared/utils/string';


class AreaPage extends Component {

    render() {
        const { suburbs } = this.props;
        const sortedSuburbs = suburbs.sortBy(s => s.get('count')).reverse();
        return (
            <Grid>
                <Helmet>
                    <title>Pilfberry - Restaurants</title>
                    <meta name="description" content={`Pilfberry - Restaurants by suburbs`} />
                    <meta name="keywords" content={`vegetarian restaurants, gluten free restaurants, vegan restaurants`} />
                </Helmet>
                <Row>
                    <Col sm={12}>
                        <h1>Restaurants in Sydney</h1>
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


export default connect(mapStateToProps, {})(AreaPage);