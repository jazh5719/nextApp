'use client'
import { Table } from "antd";
import pages from '@/pages.json'
import { useRouter, usePathname } from 'next/navigation'

export default function Home() {
  const dataSource = pages || []
  const router = useRouter()
  const toPage = (path: string) => {
    router.push(path)
  }
  const columns = [
    {
      title: '页面',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, data: any) => (
        <div style={{ cursor: 'pointer' }} onClick={() => toPage(data.key)}>{data.title}</div>
      )
    }
  ];
  return <Table
    dataSource={dataSource} columns={columns}
  />;
}
