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

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 12,
    direction: 'rtl',
    fontFamily: 'Rubik',
  },
  headerContainer: {
    flexDirection: 'row-reverse',
    borderRadius: 4,
    padding: 8,
    gap: 10,
  },
  leftSection: {
    flex: 1.2,
    alignItems: 'flex-end',
  },
  middleSection: {
    flex: 1.6,
    alignItems: 'center',
  },
  rightSection: {
    flex: 1.2,
    alignItems: 'flex-end',
  },
  logo: {
    width: 140,
    height: 'auto',
    marginBottom: 10,
  },
  orderNumber: {
    fontSize: 14,
    fontWeight: 'medium',
    marginBottom: 10,
    color: 'red',
  },
  label: {
    color: '#666',
    marginLeft: 5,
    fontSize: 11,
  },
  value: {
    marginBottom: 5,
    textAlign: 'right',
    fontSize: 11,
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
    marginBottom: 15,
    padding: 10,
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
    marginBottom: 10,
    gap: 20,
  },
  lastItemRow: {
    flexDirection: 'row-reverse',
    marginBottom: 0,
    gap: 20,
  },
  imageDescription: {
    fontSize: 10,
    color: '#666',
    marginTop: 4,
    marginBottom: 8,
    textAlign: 'left',
    maxWidth: 120,
    minHeight: 52,
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
    width: 120,
    height: 120,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 4,
    overflow: 'hidden',
  },
  itemImage: {
    maxWidth: '100%',
    maxHeight: '100%',
    objectFit: 'contain',
  },
  itemContent: {
    flex: 1,
    direction: 'rtl',
  },
  itemContainer: {
    flexDirection: 'row',
    gap: 16,
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
    marginRight: 8,
  },
  checkboxLabel: {
    fontSize: 10,
    marginLeft: 4,
  },
  checkboxRow: {
    flexDirection: 'row-reverse',
    marginBottom: 8,
    gap: 20,
  },
  imagePlaceholder: {
    width: 120,
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
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  sectionRow: {
    flexDirection: 'row-reverse',
    gap: 5,
    marginBottom: 0,
  },
  sectionLabel: {
    color: '#666',
    fontSize: 10,
  },
  sectionValue: {
    fontSize: 10,
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
                  <View style={{ flexDirection: 'row-reverse' }}>
                    <Text style={styles.label}> :מקדמה</Text>
                    <Text style={[styles.value, { color: 'black' }]}>
                      <Text style={{ color: 'red' }}>₪{order.amountPaid}</Text>
                    </Text>
                  </View>
                  <View style={styles.separator} />
                  <View style={{ flexDirection: 'row-reverse' }}>
                    <Text style={styles.label}> :סה״כ לתשלום</Text>
                    <Text style={[styles.value, { fontWeight: 'medium', color: 'red' }]}>
                      ₪{remaining}
                    </Text>
                  </View>
                </View>

                <View style={styles.middleSection}>
                  <Image src="/logo.png" style={styles.logo} />
                  <View style={{ flexDirection: 'row' }}>
                    <Text style={[styles.hebrewText, { color: 'red' }]}>{order.id}</Text>
                    <Text style={styles.hebrewText}> הזמנה מס׳</Text>
                  </View>
                </View>

                <View style={styles.rightSection}>
                  <View style={{ flexDirection: 'row-reverse', alignSelf: 'flex-end' }}>
                    <Text style={styles.label}> :תאריך</Text>
                    <Text style={styles.value}>
                      {order.createdAt
                        ? `${new Date(order.createdAt).getDate()}-${
                            new Date(order.createdAt).getMonth() + 1
                          }-${new Date(order.createdAt).getFullYear()}`
                        : '—'}
                    </Text>
                  </View>

                  <View style={{ flexDirection: 'row-reverse', alignSelf: 'flex-end' }}>
                    <Text style={styles.label}> :כתובת</Text>
                    <Text style={styles.value}>{company.address?.streetAddress}</Text>
                  </View>

                  <View style={{ flexDirection: 'row-reverse', alignSelf: 'flex-end' }}>
                    <Text style={styles.label}> :אימייל</Text>
                    <Text style={styles.value}>{company.email}</Text>
                  </View>

                  <View style={{ flexDirection: 'row-reverse', alignSelf: 'flex-end' }}>
                    <Text style={styles.label}> :טלפון</Text>
                    {company.phones.map((phone) => (
                      <Text key={phone.id} style={[styles.value, styles.phoneNumber]}>
                        {formatPhoneForPDF(phone.number)}
                      </Text>
                    ))}
                  </View>
                </View>
              </View>
              <View style={styles.headerSeparator} />
            </>
          )}

          {/* Render the chunk of order items (max 3 per page) */}
          {chunk.map((item, index) => (
            <View key={index} wrap={false} style={styles.orderItemCard}>
              <View style={styles.itemContainer}>
                <View>
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
                    <Text style={styles.itemValue}>
                      {item.adhesions?.length ? item.adhesions.map((a) => a.name).join(', ') : '-'}
                    </Text>
                  </View>

                  <View
                    style={
                      index === (item.prints?.length || 0) - 1 ? styles.lastItemRow : styles.itemRow
                    }
                  >
                    <Text style={styles.itemLabel}>:הדפסות</Text>
                    <Text style={styles.itemValue}>
                      {item.prints?.length ? item.prints.map((p) => p.name).join(', ') : '-'}
                    </Text>
                  </View>

                  <View
                    style={
                      index === (item.descriptions?.length || 0) - 1
                        ? styles.lastItemRow
                        : styles.itemRow
                    }
                  >
                    <Text style={styles.itemLabel}>:תיאור</Text>
                    <Text style={styles.itemValue}>
                      {item.descriptions?.length
                        ? item.descriptions.map((d) => d.name).join(', ')
                        : '-'}
                    </Text>
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
