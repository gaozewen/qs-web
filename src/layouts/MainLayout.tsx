import React, { FC } from 'react'
import { Outlet } from 'react-router-dom'
import { Layout } from 'antd'
import styles from './MainLayout.module.scss'
import Logo from '../components/Logo'

const { Header, Footer, Content } = Layout

const MainLayout: FC = () => {
  Layout
  return (
    <Layout>
      <Header className={styles.header}>
        <div className={styles.left}>
          <Logo />
        </div>
        <div className={styles.right}>登录</div>
      </Header>
      <Content className={styles.main}>
        <Outlet />
      </Content>
      <Footer className={styles.footer}>问卷系统 &copy;2023 - present. Created by 高泽文</Footer>
    </Layout>
  )
}

export default MainLayout