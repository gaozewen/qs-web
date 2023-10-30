import React, { FC, useState } from 'react'
import { useTitle } from 'ahooks'
import { Empty, Typography, Table, Tag, Space, Button, Modal, message, Spin } from 'antd'
import styles from './common.module.scss'
import { ExclamationCircleOutlined, StarFilled, StarOutlined } from '@ant-design/icons'
import { ColumnsType } from 'antd/es/table'
import ListSearch from '../../components/ListSearch'
import useLoadQuestionnaireListData from '../../hooks/useLoadQuestionnaireListData'
import { Questionnaire } from '../../@types/questionnaire'

const { Title } = Typography

const Star: FC = () => {
  useTitle('问卷系统 - 回收站')

  const { loading, data } = useLoadQuestionnaireListData({ isDeleted: true })
  const { list = [], total = 0 } = (data || {}) as { list: Questionnaire[]; total: number }
  console.log('total', total)

  const [selectedIds, setSelectedIds] = useState<string[]>([])

  const onDelete = () => {
    Modal.confirm({
      title: '确定彻底删除该问卷么？',
      icon: <ExclamationCircleOutlined />,
      content: '删除后将无法找回',
      okText: '确定',
      cancelText: '取消',
      onOk: () => {
        message.success('删除成功')
      },
    })
  }

  // 一定要定义 Typescript 类型才可以使用 align 等属性
  const tableColumns: ColumnsType<Questionnaire> = [
    {
      title: '标题',
      dataIndex: 'title',
      align: 'center',
      // key: 'title', // 循环列的 key ，他会默认取 dataIndex 的值
    },
    {
      title: '是否发布',
      dataIndex: 'isPublished',
      align: 'center',
      render: (isPublished: boolean) =>
        isPublished ? <Tag color="green">已发布</Tag> : <Tag>未发布</Tag>,
    },
    {
      title: '是否标星',
      dataIndex: 'isStar',
      align: 'center',
      render: (isStar: boolean) =>
        isStar ? (
          <StarFilled style={{ color: '#1677ff' }} />
        ) : (
          <StarOutlined style={{ color: '#1677ff' }} />
        ),
    },
    {
      title: '答卷数',
      dataIndex: 'answerCount',
      align: 'center',
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
      align: 'center',
    },
  ]

  const TableElement = (
    <>
      <div style={{ marginBottom: '16px' }}>
        <Space>
          <Button type="primary" disabled={selectedIds.length === 0}>
            恢复
          </Button>
          <Button danger disabled={selectedIds.length === 0} onClick={onDelete}>
            删除
          </Button>
        </Space>
      </div>
      <Table
        columns={tableColumns}
        dataSource={list}
        pagination={false}
        rowKey="_id"
        rowSelection={{
          type: 'checkbox',
          onChange: selectedRowKeys => {
            // 将 Key[] 类型当做 string[]
            setSelectedIds(selectedRowKeys as string[])
          },
        }}
      />
    </>
  )

  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3} style={{ margin: '0 0 24px 0' }}>
            回收站
          </Title>
        </div>
        <div className={styles.right}>
          <ListSearch />
        </div>
      </div>
      <div className={styles.content}>
        {loading && (
          <div style={{ textAlign: 'center' }}>
            <Spin spinning={loading} />
          </div>
        )}
        {!loading && list.length > 0 && TableElement}
        {!loading && list.length === 0 && <Empty description="暂无数据" />}
      </div>
      <div className={styles.footer}>分页</div>
    </>
  )
}

export default Star
