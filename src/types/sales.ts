import { Barang } from './barang';
import { Customer } from './customers';

export interface Sales {
  id: number;
  kode: string;
  tgl: string;
  cust_id: number;
  subtotal: number;
  diskon: number;
  total: number;
  ongkir: number;
  total_bayar: number;
  created_at?: string | null;
  updated_at?: string | null;
  deleted_at?: string | null;
  details: SalesDetail[];
  customer?: Customer | null;
}

export interface SalesDetail {
  id: number;
  sales_id: number;
  barang_id: number;
  harga_bandrol: number;
  qty: number;
  diskon_pct: number;
  diskon_nilai: number;
  harga_diskon: number;
  total: number;
  barang?: Barang;
  created_at?: string | null;
  updated_at?: string | null;
  deleted_at?: string | null;
}
