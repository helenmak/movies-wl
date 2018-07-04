import React from 'react'
import { or, not } from 'ramda'

import { Layout, Card, Row, Col, Divider } from 'antd'
import NoContent from '../NoContent'
import {branch} from "recompose";

const Content = Layout.Content

const MovieCard = props => {
  const renderContent = movie =>
    <Content style={{ background: '#fff' }} >
      <Row>
        <Card bordered={false} style={{ width: '80%' }}>
          <Row type="flex" justify='space-between'>

            <Col xs={24} lg={17}>
              <Row justify='center'>
                <h1>{movie.get('title')}</h1>
              </Row>

              <Row>
                <span>ID: {movie.get('_id')}</span>
              </Row>

              <Divider />

              <Row justify='center'>
                <p>Format: {movie.get('format') || 'Unknown'}</p>
              </Row>

              <Row justify='center'>
                <p>Release year: {movie.get('year') || 'Unknown'}</p>
              </Row>

              <Row justify='center'>
                <p>Stars: {movie.get('stars').join(", ") || 'Unknown'}</p>
              </Row>
            </Col>

          </Row>
        </Card>
      </Row>
    </Content>

  return <Layout> {renderContent(props.movie)} </Layout>
}

const renderNoContent = props => props => <NoContent />

export default branch(
  props => or(not(props.movie), not(props.movie.get('_id'))),
  renderNoContent
)(MovieCard)