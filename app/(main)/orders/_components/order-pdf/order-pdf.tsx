import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
  Font,
  Svg,
  Path,
  Rect,
} from '@react-pdf/renderer';
import { Order, OrderItem, Customer, Company, Address, Phone } from '@prisma/client';
import dayjs from 'dayjs';

const styles = StyleSheet.create({
  page: {
    padding: 15,
    fontSize: 12,
    direction: 'rtl',
    fontFamily: 'Rubik',
  },
  headerContainer: {
    flexDirection: 'row-reverse',
    borderRadius: 4,
    padding: 5,
    gap: 6,
    marginBottom: 5,
  },
  leftSection: {
    flex: 1.2,
    alignItems: 'flex-end',
  },
  middleSection: {
    flex: 1.6,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rightSection: {
    flex: 1.2,
    alignItems: 'flex-end',
  },
  logo: {
    width: 120,
    height: 'auto',
    marginBottom: 5,
  },
  orderNumber: {
    fontSize: 14,
    fontWeight: 'medium',
    marginBottom: 10,
    color: 'red',
  },
  label: {
    color: '#666',
    marginLeft: 4,
    fontSize: 10,
  },
  value: {
    marginBottom: 3,
    textAlign: 'right',
    fontSize: 10,
  },
  table: {
    marginTop: 20,
  },
  tableHeader: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    paddingBottom: 5,
    backgroundColor: '#f6f6f6',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingVertical: 8,
  },
  dimensionsCell: {
    flex: 1,
    paddingHorizontal: 5,
  },
  detailsCell: {
    flex: 2,
    paddingHorizontal: 5,
  },
  priceCell: {
    width: 80,
    textAlign: 'right',
    paddingHorizontal: 5,
  },
  quantityCell: {
    width: 60,
    textAlign: 'center',
    paddingHorizontal: 5,
  },
  totalCell: {
    width: 80,
    textAlign: 'right',
    paddingHorizontal: 5,
  },
  totalsSection: {
    marginTop: 20,
    alignItems: 'flex-end',
  },
  totalRow: {
    flexDirection: 'row',
    marginTop: 5,
  },
  totalLabel: {
    width: 120,
  },
  totalValue: {
    width: 100,
    textAlign: 'right',
  },
  phoneNumber: {
    direction: 'ltr',
    textAlign: 'right',
    marginBottom: 5,
  },
  separator: {
    borderBottomWidth: 1,
    borderBottomStyle: 'dashed',
    borderBottomColor: '#ddd',
    marginVertical: 6,
    width: '100%',
  },
  hebrewText: {
    fontFamily: 'Rubik',
    textAlign: 'right',
    fontWeight: 'medium',
  },
  headerSeparator: {
    borderBottomWidth: 1.5,
    borderBottomColor: '#000',
    marginBottom: 15,
  },
  orderItemCard: {
    marginBottom: 8,
    padding: 6,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    breakInside: 'avoid',
  },
  itemHeader: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    marginBottom: 8,
    paddingBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  itemTitle: {
    fontSize: 12,
    fontWeight: 'medium',
  },
  itemRow: {
    flexDirection: 'row-reverse',
    marginBottom: 4,
    gap: 15,
    minHeight: 16,
  },
  lastItemRow: {
    flexDirection: 'row-reverse',
    marginBottom: 0,
    gap: 15,
    minHeight: 16,
  },
  imageDescription: {
    fontSize: 9,
    color: '#666',
    marginTop: 3,
    marginBottom: 0,
    textAlign: 'left',
    maxWidth: 160,
    minHeight: 80,
    height: 80,
    padding: 4,
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 4,
  },
  itemLabel: {
    color: '#666',
    fontSize: 10,
  },
  itemValue: {
    fontSize: 10,
  },
  glassTypes: {
    flexDirection: 'row-reverse',
    gap: 15,
    marginVertical: 4,
  },
  glassType: {
    fontSize: 9,
  },
  notes: {
    fontSize: 10,
    color: '#666',
    marginTop: 5,
    padding: 4,
    backgroundColor: '#f9f9f9',
  },
  imageContainer: {
    width: 160,
    height: 120,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 4,
    overflow: 'hidden',
    flexShrink: 0,
  },
  itemImage: {
    maxWidth: '100%',
    maxHeight: '100%',
    objectFit: 'contain',
  },
  itemContent: {
    flex: 1,
    direction: 'rtl',
    gap: 4,
  },
  itemContainer: {
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  checkbox: {
    width: 12,
    height: 12,
    border: '1px solid #000',
    backgroundColor: '#fff',
    marginRight: 4,
  },
  checkedBox: {
    backgroundColor: '#000',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 6,
    minHeight: 14,
  },
  checkboxLabel: {
    fontSize: 9,
    marginLeft: 3,
    lineHeight: 1.2,
  },
  checkboxRow: {
    flexDirection: 'row-reverse',
    marginBottom: 4,
    gap: 15,
    minHeight: 16,
  },
  imagePlaceholder: {
    width: 160,
    height: 120,
    backgroundColor: '#f5f5f5',
    borderRadius: 4,
  },
  checkboxIcon: {
    width: 12,
    height: 12,
    marginRight: 4,
  },
  printSection: {
    marginTop: 4,
    paddingTop: 4,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    minHeight: 16,
  },
  sectionRow: {
    flexDirection: 'row-reverse',
    gap: 5,
    marginBottom: 0,
    minHeight: 16,
  },
  sectionLabel: {
    color: '#666',
    fontSize: 9,
  },
  sectionValue: {
    fontSize: 9,
  },
  priceSection: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    flexDirection: 'row-reverse',
    justifyContent: 'flex-end',
    gap: 40,
  },
  tagContainer: {
    flexDirection: 'row-reverse',
    flexWrap: 'wrap',
    gap: 4,
    marginTop: 1,
    marginBottom: 1,
    alignItems: 'flex-start',
    minHeight: 12,
  },
  tag: {
    backgroundColor: '#f5f5f5',
    borderRadius: 3,
    padding: '2 5',
    fontSize: 9,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    marginBottom: 2,
  },
});

Font.register({
  family: 'Rubik',
  fonts: [
    { src: '/fonts/Rubik-Regular.ttf', fontWeight: 'normal' },
    { src: '/fonts/Rubik-Bold.ttf', fontWeight: 'bold' },
    { src: '/fonts/Rubik-Medium.ttf', fontWeight: 'medium' },
  ],
});

interface OrderPDFProps {
  order: Order & {
    customer: Customer & {
      phones?: {
        id: number;
        number: string;
        isPrimary: boolean;
      }[];
    };
    orderItems: (OrderItem & {
      adhesions: { name: string }[];
      frame?: { name: string } | null;
      passepartout?: { name: string } | null;
      prints?: { name: string }[];
      descriptions?: { name: string }[];
    })[];
  };
  company: Company & {
    address?: Address;
    phones: Phone[];
  };
}

const formatPhoneForPDF = (number: string) => (number.startsWith('0') ? number : `0${number}`);

const getProxiedImageUrl = (originalUrl: string) => {
  if (!originalUrl) return '';
  // Force PNG format and add timestamp to prevent caching issues
  return `/api/proxy-image?url=${encodeURIComponent(originalUrl)}&format=png&t=${Date.now()}`;
};

// Helper function to chunk array into groups
const chunkArray = <T,>(array: T[], size: number): T[][] => {
  const chunks: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
};

export function OrderPDF({ order, company }: OrderPDFProps) {
  const orderItemChunks = chunkArray(order.orderItems, 3);
  const remaining =
    order.orderItems.reduce((sum, item) => sum + (item.price || 0), 0) - (order.amountPaid || 0);

  return (
    <Document>
      {orderItemChunks.map((chunk, pageIndex) => (
        <Page key={pageIndex} size="A4" style={styles.page}>
          {/* Render header only on first page */}
          {pageIndex === 0 && (
            <>
              <View style={styles.headerContainer}>
                <View style={styles.leftSection}>
                  <View style={{ flexDirection: 'row-reverse' }}>
                    <Text style={styles.label}> :שם</Text>
                    <Text style={styles.value}>
                      {order.customer.firstName} {order.customer.lastName}
                    </Text>
                  </View>
                  {order.customer.phones?.map((phone) => (
                    <View key={phone.id} style={{ flexDirection: 'row-reverse' }}>
                      <Text style={styles.label}> :טלפון</Text>
                      <Text style={[styles.value, styles.phoneNumber]}>
                        {formatPhoneForPDF(phone.number)}
                      </Text>
                    </View>
                  ))}
                </View>

                <View style={styles.middleSection}>
                  <View style={{ flexDirection: 'row' }}>
                    <Text style={[styles.hebrewText, { color: 'red' }]}>{order.id}</Text>
                    <Text style={styles.hebrewText}> הזמנה מס׳</Text>
                  </View>

                  <Image src="/logo.png" style={styles.logo} />
                </View>

                <View style={styles.rightSection}>
                  <View style={{ flexDirection: 'row-reverse', alignSelf: 'flex-end' }}>
                    <Text style={styles.label}> :תאריך</Text>
                    <Text style={styles.value}>
                      {order.createdAt ? dayjs(order.createdAt).format('DD/MM/YYYY HH:mm') : '—'}
                    </Text>
                  </View>

                  <View style={{ flexDirection: 'row-reverse', alignSelf: 'flex-end' }}>
                    <Text style={styles.label}> :טלפון</Text>
                    {company.phones.map((phone) => (
                      <Text key={phone.id} style={[styles.value, styles.phoneNumber]}>
                        {formatPhoneForPDF(phone.number)}
                      </Text>
                    ))}
                  </View>

                  <View style={{ flexDirection: 'row-reverse', alignSelf: 'flex-end' }}>
                    <Text style={styles.label}> :כתובת</Text>
                    <Text style={styles.value}>{company.address?.streetAddress}</Text>
                  </View>

                  <View style={{ flexDirection: 'row-reverse', alignSelf: 'flex-end' }}>
                    <Text style={styles.label}> :אימייל</Text>
                    <Text style={styles.value}>{company.email}</Text>
                  </View>
                </View>
              </View>

              {/* New payment information row */}
              <View
                style={{
                  flexDirection: 'row-reverse',
                  justifyContent: 'space-between',
                  paddingVertical: 3,
                  paddingHorizontal: 10,
                  borderTopWidth: 1,
                  borderTopColor: '#ddd',
                  borderBottomWidth: 1.5,
                  borderBottomColor: '#000',
                  marginBottom: 8,
                  marginTop: 5,
                }}
              >
                <View style={{ flexDirection: 'row-reverse', alignItems: 'center' }}>
                  <Text style={[styles.label, { marginBottom: 0 }]}> :מקדמה</Text>
                  <Text style={[styles.value, { marginBottom: 0, marginLeft: 10 }]}>
                    ₪{order.amountPaid}
                  </Text>
                </View>

                <View style={{ width: 1, height: 16, backgroundColor: '#ddd' }} />

                <View style={{ flexDirection: 'row-reverse', alignItems: 'center' }}>
                  <Text style={[styles.label, { marginBottom: 0 }]}> :סה״כ</Text>
                  <Text style={[styles.value, { marginBottom: 0, marginLeft: 10 }]}>
                    ₪{order.orderItems.reduce((sum, item) => sum + (item.price || 0), 0)}
                  </Text>
                </View>

                <View style={{ width: 1, height: 16, backgroundColor: '#ddd' }} />

                <View style={{ flexDirection: 'row-reverse', alignItems: 'center' }}>
                  <Text style={[styles.label, { marginBottom: 0 }]}> :סה״כ לתשלום</Text>
                  <Text
                    style={[
                      styles.value,
                      { marginBottom: 0, marginLeft: 10, fontWeight: 'medium', color: 'red' },
                    ]}
                  >
                    ₪{remaining}
                  </Text>
                </View>
              </View>
            </>
          )}

          {/* Render the chunk of order items (max 3 per page) */}
          {chunk.map((item, index) => (
            <View key={index} wrap={false} style={styles.orderItemCard}>
              <View style={styles.itemContainer}>
                <View style={{ gap: 8, display: 'flex', flexDirection: 'column' }}>
                  {item.image ? (
                    <View style={styles.imageContainer}>
                      <Image
                        src={getProxiedImageUrl(item.image)}
                        style={styles.itemImage}
                        cache={false}
                      />
                    </View>
                  ) : (
                    <View style={styles.imagePlaceholder} />
                  )}
                  <View style={[styles.imageDescription, { margin: 0 }]}>
                    <Text>{item.notes || ''}</Text>
                  </View>
                </View>

                <View style={styles.itemContent}>
                  <View style={styles.itemRow}>
                    <Text style={styles.itemLabel}>:מידות תמונה</Text>
                    <Text style={styles.itemValue}>
                      {item.width ? `${item.width}cm` : '-'} x{' '}
                      {item.height ? `${item.height}cm` : '-'}
                    </Text>
                  </View>

                  <View style={styles.itemRow}>
                    <Text style={styles.itemLabel}>:מספר מסגרת</Text>
                    <Text style={styles.itemValue}>{item.frame?.name || '-'}</Text>
                  </View>

                  <View style={styles.itemRow}>
                    <View style={{ flexDirection: 'row-reverse', gap: 20 }}>
                      <View style={{ flexDirection: 'row-reverse', gap: 5 }}>
                        <Text style={styles.itemLabel}>:מספר פספרטו</Text>
                        <Text style={styles.itemValue}>{item.passepartout?.name || '-'}</Text>
                      </View>
                      <View style={{ flexDirection: 'row-reverse', gap: 5 }}>
                        <Text style={styles.itemLabel}>:רוחב פספרטו</Text>
                        <Text style={styles.itemValue}>
                          {item.passepartoutWidth ? `${item.passepartoutWidth}cm` : '-'}
                        </Text>
                      </View>
                    </View>
                  </View>

                  <View style={styles.checkboxRow}>
                    {Object.entries(
                      JSON.parse(String(item.glassTypes)) as Record<string, boolean>
                    ).map(([key, value]) => (
                      <View key={key} style={styles.checkboxContainer}>
                        <Svg style={styles.checkboxIcon} viewBox="0 0 14 14">
                          {value ? (
                            <>
                              <Rect
                                x="1"
                                y="1"
                                width="12"
                                height="12"
                                rx="2"
                                fill="#000"
                                stroke="#000"
                                strokeWidth="1"
                              />
                              <Path
                                d="M3.5 7L6 9.5L10.5 4"
                                stroke="#fff"
                                strokeWidth="1.5"
                                fill="none"
                              />
                            </>
                          ) : (
                            <Rect
                              x="1"
                              y="1"
                              width="12"
                              height="12"
                              rx="2"
                              stroke="#000"
                              strokeWidth="1"
                              fill="none"
                            />
                          )}
                        </Svg>
                        <Text style={styles.checkboxLabel}>
                          {key === 'transparent'
                            ? 'זכוכית שקופה'
                            : key === 'matte'
                            ? 'זכוכית מט'
                            : key === 'none'
                            ? 'ללא זכוכית'
                            : key === 'perspex'
                            ? 'פרספקס'
                            : key === 'mirror'
                            ? 'מראה'
                            : key}
                        </Text>
                      </View>
                    ))}
                  </View>

                  <View
                    style={
                      index === (item.adhesions?.length || 0) - 1
                        ? styles.lastItemRow
                        : styles.itemRow
                    }
                  >
                    <Text style={styles.itemLabel}>:הדבקות</Text>
                    {item.adhesions?.length ? (
                      <View style={styles.tagContainer}>
                        {item.adhesions.map((adhesion, i) => (
                          <Text key={i} style={styles.tag}>
                            {adhesion.name}
                          </Text>
                        ))}
                      </View>
                    ) : (
                      <Text style={styles.itemValue}>-</Text>
                    )}
                  </View>

                  <View
                    style={
                      index === (item.prints?.length || 0) - 1 ? styles.lastItemRow : styles.itemRow
                    }
                  >
                    <Text style={styles.itemLabel}>:הדפסות</Text>
                    {item.prints?.length ? (
                      <View style={styles.tagContainer}>
                        {item.prints.map((print, i) => (
                          <Text key={i} style={styles.tag}>
                            {print.name}
                          </Text>
                        ))}
                      </View>
                    ) : (
                      <Text style={styles.itemValue}>-</Text>
                    )}
                  </View>

                  <View
                    style={
                      index === (item.descriptions?.length || 0) - 1
                        ? styles.lastItemRow
                        : styles.itemRow
                    }
                  >
                    <Text style={styles.itemLabel}>:תיאור</Text>
                    {item.descriptions?.length ? (
                      <View style={styles.tagContainer}>
                        {item.descriptions.map((description, i) => (
                          <Text key={i} style={styles.tag}>
                            {description.name}
                          </Text>
                        ))}
                      </View>
                    ) : (
                      <Text style={styles.itemValue}>-</Text>
                    )}
                  </View>

                  <View style={styles.printSection}>
                    <View style={styles.sectionRow}>
                      <View
                        style={{
                          flexDirection: 'row-reverse',
                          gap: 20,
                          alignItems: 'center',
                        }}
                      >
                        <View style={{ flexDirection: 'row-reverse', gap: 5 }}>
                          <Text style={styles.itemLabel}>:כמות</Text>
                          <Text style={styles.itemValue}>{item.quantity}</Text>
                        </View>
                        <View style={{ flexDirection: 'row-reverse', gap: 5 }}>
                          <Text style={styles.itemLabel}>:מחיר יחידה</Text>
                          <Text style={styles.itemValue}>₪{item.unitPrice}</Text>
                        </View>
                        <View style={{ flexDirection: 'row-reverse', gap: 5 }}>
                          <Text style={styles.itemLabel}>:מחיר</Text>
                          <Text style={styles.itemValue}>₪{item.unitPrice * item.quantity}</Text>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          ))}
        </Page>
      ))}
    </Document>
  );
}
