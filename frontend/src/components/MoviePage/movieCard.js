import React from 'react'

import { Layout, Card, Badge, Row, Col, Divider } from 'antd'
import NoContent from '../NoContent'

const Content = Layout.Content

export default props => {
  const imageApi = 'https://image.tmdb.org/t/p/'

  const computeBadgeStyle = (isPoster, vote) => {
    if (!isPoster) return {}
    return vote >= 6.5 ? { backgroundColor: 'green', color: '#fff'} : {}
  }

  const renderContent = movie => {
    if( !movie || !movie.get('id') ){
      return <NoContent/>
    } else {
      return <Content style={{ background: '#fff' }} >
        <Row>
          <Card bordered={false} style={{ width: '80%' }}>
            <Row type="flex" justify='space-between'>

              <Col xs={24} lg={17}>
                <Row justify='center'>
                  <h1>{props.movie.get('title')}</h1>
                </Row>

                <Row>
                  <span>Genre: {props.movie.get('genres') ? props.movie.get('genres').map(genre=>genre.get('name')).join(', ') : 'unknown'}</span>
                </Row>

                <Divider />

                <Row>
                  <p>{props.movie.get('overview') || 'No overview'}</p>
                </Row>

                <Divider />

                <Row justify='center'>
                  <p>Budget: {props.movie.get('budget')}</p>
                </Row>
                <Row justify='center'>
                  <p>Release: {props.movie.get('release_date')}</p>
                </Row>

                <Row justify='center'>
                  <p>Popularity: {props.movie.get('popularity')}</p>
                </Row>

                <Row justify='center'>
                  <p>Votes: {props.movie.get('vote_count')}</p>
                </Row>
              </Col>

              <Col xs={24} offset-lg={2} lg={4}>
                <Badge count={<span>{props.movie.get('vote_average')}</span>}
                       style={computeBadgeStyle(props.movie.get('poster_path'), props.movie.get('vote_average'))}
                >
                  <img src={`${imageApi}/w300/${props.movie.get('poster_path')}`} alt="no poster"/>
                </Badge>
              </Col>

            </Row>
          </Card>
        </Row>
      </Content>
    }
  }

  return <Layout>
      {renderContent(props.movie)}
    </Layout>
}