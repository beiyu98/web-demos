import { Button, Field, Form, Input, Select, Table } from '@alifd/next';
import produce from 'immer';
import React, { useEffect } from 'react';


interface IRowData{
  type: string;
  count: number;
  unit: string;
}

export default function () {
  const field = Field.useField({
    parseName: true,
  });

  const list = field.getValue<IRowData[]>('list') || [];

  useEffect(() => {
    if (list.length) return;
    field.setValue('list', produce(list, (draft: IRowData[]) => {
      draft.push({
        type: 'type1',
        count: 1,
        unit: 'coupon',
      });
    }));
  }, [list, field]);

  return (
    <div style={{ background: '#fefefe' }}>
      <Form field={field} labelAlign="left" labelCol={{ span: 3 }} wrapperCol={{ span: 12 }}>
        <Form.Item label="名称" name="name" required requiredMessage="名称不能为空">
          <Input />
          <Table dataSource={list} style={{ marginTop: 12 }}>
            <Table.Column
              title="类型"
              dataIndex="type"
              cell={(value: string, index: number) => {
                return (
                  <Form.Item required name={`list[${index}].type`} requiredMessage="类型不能为空">
                    <Input
                      value={value}
                      onChange={(v) => {
                        field.setValue('list', produce(list, (draft: IRowData[]) => {
                          draft[index].type = v;
                        }));
                      }}
                    />
                  </Form.Item>);
              }}
            />
            <Table.Column
              title="数量"
              dataIndex="count"
              cell={(value: string, index: number) => {
                return (
                  <Form.Item required name={`list[${index}].count`} requiredMessage="数量不能为空">
                    <Input
                      value={value}
                      onChange={(v) => {
                        field.setValue('list', produce(list, (draft: IRowData[]) => {
                          draft[index].count = Number(v);
                        }));
                      }}
                    />
                  </Form.Item>);
              }}
            />
            <Table.Column
              title="单位"
              dataIndex="unit"
              cell={(value: string, index: number) => {
                return (
                  <Form.Item required name={`list[${index}].unit`} requiredMessage="单位不能为空">
                    <Select
                      value={value}
                      dataSource={[
                        { label: '元', value: 'rmb' },
                        { label: '张', value: 'coupon' },
                      ]}
                      onChange={(v) => {
                        field.setValue('list', produce(list, (draft: IRowData[]) => {
                          draft[index].unit = v;
                        }));
                      }}
                    />
                  </Form.Item>);
              }}
            />
            <Table.Column
              title="操作"
              dataIndex="opt"
              cell={(_: string, index: number) => {
                return (
                  <div>
                    <Button
                      text
                      disabled={list.length < 2}
                      onClick={() => {
                        field.setValue('list', produce(list, (draft: IRowData[]) => {
                          draft.splice(index, 1);
                        }));
                      }}
                    >删除
                    </Button>
                    <Button
                      text
                      onClick={() => {
                        field.setValue('list', produce(list, (draft: IRowData[]) => {
                          draft.push({
                            type: 'type1',
                            count: 1,
                            unit: 'coupon',
                          });
                        }));
                      }}
                    >新增
                    </Button>
                  </div>
                );
              }}
            />
          </Table>
          <Form.Item>
            <Button onClick={() => {
              field.validate((errs, values) => {
                console.log('submit', { errs, values });
              });
            }}
            >
              submit
            </Button>
          </Form.Item>
        </Form.Item>
      </Form>
    </div>
  );
}
