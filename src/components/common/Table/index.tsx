import React, { ReactNode } from 'react';
import Block from '../Block';
import Button from '../Button';
import Heading from '../Heading';

import styles from './styles.module.css';

type TableProps = {
  label: string;
  tableHeader: ReactNode[];
  tableBody: AuctionItem[];
};

type AuctionItem = {
  address: string;
  price: number | string;
  vol: number | string;
  slide: number | string;
};

const Table = ({ label, tableHeader, tableBody }: TableProps) => {
  return (
    <div>
      <Heading label={label} css={'mb-8 text-center'} variant="large" />
      <div className="w-full">
        <Block css="border-grey-500 overflow-y-scroll max-h-[650px]">
          <table className={`${styles.table}`}>
            <thead className="rounded-md border-b border-grey-500">
              <tr>
                {tableHeader.map((item, index) => {
                  return (
                    <th className="w-auto rounded-md py-4" key={index}>
                      {item}
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody className={styles.table_body}>
              {tableBody.map((item: AuctionItem, index) => {
                return (
                  <tr key={index}>
                    <td>{item.address}</td>
                    <td>{item.price}</td>
                    <td>{item.vol}</td>
                    <td>
                      <Button label="Claim" />
                    </td>
                    <td>
                      <Button label="Cancel" />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Block>
      </div>
    </div>
  );
};

export default Table;