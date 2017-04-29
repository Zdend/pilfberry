import React from 'react';
import {Grid, Row, Col, Button} from 'react-bootstrap';
import {t} from 'i18next';

const LanguageList = ({activeLanguage, languages, languageChangeAction}) => (
    <ul className="list-inline inline-block">
        {languages.map((language, i) => {
            const isActive = language.get('codes').includes(activeLanguage);
            return (
                <li key={i}>
                    <Button bsStyle="link" onClick={() => languageChangeAction(language.get('codes').first())}>
                        {isActive ? <b>{language.get('label')}</b> : <span>{language.get('label')}</span>}
                    </Button>
                </li>
            );
        }
        )}
    </ul>
);


const Footer = (props) => (
    <footer>
        <hr />
        <Grid>
            <Row>
                <Col xs={12}>
                    {t('layout.footer.changeLanguage')}: <LanguageList {...props} />
                </Col>
            </Row>

        </Grid>
    </footer>
);

export default Footer;