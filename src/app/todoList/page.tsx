'use client'
import React, { useState, useEffect } from 'react'
import { ITodo, TAB_KEY, TAB_LIST } from './contants'
import { Input, Row, Col, Button, Tabs, Checkbox, Popconfirm } from 'antd'
const TodoList = () => {
    const [inputVal, setInput] = useState<string>()
    const [activeTab, setTab] = useState<TAB_KEY>(TAB_KEY.ALL)
    const [todoList, setTodoList] = useState<ITodo[]>([])

    // 当组件挂载时从本地存储加载待办事项列表
    useEffect(() => {
        const localTodoList = JSON.parse(localStorage.getItem('todoList') || '[]')
        setTodoList(localTodoList)
    }, [])

    // 添加todo
    const addTodo = () => {
        if (inputVal) {
            setTodoList([
                ...todoList,
                {
                    content: inputVal,
                    id: Date.now(),
                    isDone: false
                }
            ])
            setInput('')
        }
    }

    // 当todoList发生变化时，自动将todoList存储到localStorage
    useEffect(() => {
        localStorage.setItem('todoList', JSON.stringify(todoList))
    }, [todoList])

    // 删除todo
    const deleteTodo = (id: number) => {
        setTodoList(todoList.filter((item) => item.id !== id))
    }
    // 完成todo
    const completedToDo = (id: number) => {
        setTodoList(todoList.map((item) => {
            if (item.id === id) {
                item.isDone = !item.isDone
            }
            return item
        }))
    }

    return (
        <Row className='todoList'>
            <Col span={24}>
                {/* 输入 */}
                <Row>
                    <Col span={18}>
                        <Input
                            placeholder='请输入待办事项'
                            value={inputVal}
                            onChange={(e) => setInput(e.target.value)}
                        />
                    </Col>
                    <Col span={4}>
                        <Button type='primary' onClick={() => addTodo()}>确定</Button>
                    </Col>
                </Row>

                {/* 切换tab */}
                <Row style={{ marginTop: '20px' }}>
                    <Col>
                        <Tabs activeKey={activeTab} items={TAB_LIST} onChange={(tab) => setTab(tab as TAB_KEY)} />
                    </Col>
                </Row>

                {/* 列表 */}
                <Row>
                    <Col span={24}>
                        {
                            todoList.map((item) => {
                                if (activeTab === TAB_KEY.ACTIVE && item.isDone) {
                                    return null
                                }
                                if (activeTab === TAB_KEY.COMPLETED && !item.isDone) {
                                    return null
                                }
                                return <Row
                                    key={item.id}
                                    justify={'space-between'}
                                    align={'middle'}
                                    style={{
                                        margin: '20px 0',
                                        padding: '10px',
                                        background: '#eee',
                                        borderRadius: '10px',
                                        display: 'flex'
                                    }}>
                                    <Col style={{ width: '25px' }}>
                                        <Checkbox
                                            checked={item.isDone}
                                            onChange={() => completedToDo(item.id)}
                                        />
                                    </Col>
                                    <Col
                                        className='ellipsis-3-lines'
                                        style={{
                                            textDecoration: activeTab === TAB_KEY.ALL && item.isDone ? 'line-through' : 'none',
                                            lineHeight: '24px',
                                            color: activeTab === TAB_KEY.ALL && item.isDone ? '#666' : 'auto',
                                            flex: 1,
                                        }}
                                    >
                                        {item.content}
                                    </Col>
                                    <Col style={{ lineHeight: '24px', width: '45px' }}>
                                        <Popconfirm
                                            title="确定要删除吗？"
                                            description="删除之后无法恢复哦~"
                                            onConfirm={() => deleteTodo(item.id)}
                                            okText="确定"
                                            cancelText="取消"
                                        >
                                            <Button type='link' size='small'>删除</Button>
                                        </Popconfirm>
                                    </Col>
                                </Row>
                            })
                        }
                    </Col>
                </Row>
            </Col>
        </Row>
    )
}

export default TodoList



