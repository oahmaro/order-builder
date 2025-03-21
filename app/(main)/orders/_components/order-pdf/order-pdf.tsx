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
    direction: 'ltr',
    maxWidth: 160,
    minHeight: 80,
    padding: 4,
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 4,
    overflow: 'hidden',
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
            <View
              key={index}
              wrap={false}
              style={[styles.orderItemCard, { marginBottom: 4, padding: 5 }]}
            >
              <View style={[styles.itemContainer, { gap: 6 }]}>
                <View style={{ gap: 4, display: 'flex', flexDirection: 'column', width: 160 }}>
                  {item.image ? (
                    <View style={[styles.imageContainer, { height: 130 }]}>
                      <Image
                        src={getProxiedImageUrl(item.image)}
                        style={styles.itemImage}
                        cache={false}
                      />
                    </View>
                  ) : (
                    <View style={[styles.imagePlaceholder, { height: 130 }]} />
                  )}
                  <View
                    style={[
                      styles.imageDescription,
                      {
                        margin: 0,
                        height: 70,
                        maxHeight: 70,
                        overflow: 'hidden',
                      },
                    ]}
                  >
                    <Text>{item.notes || ''}</Text>
                  </View>
                </View>

                <View style={styles.itemContent}>
                  {/* Add the item number with minimal space */}
                  <View
                    style={[
                      styles.itemRow,
                      {
                        marginBottom: 4,
                        borderBottomWidth: 1,
                        borderBottomColor: '#eee',
                        paddingBottom: 2,
                        minHeight: 15,
                      },
                    ]}
                  >
                    <Text style={[styles.itemTitle, { fontWeight: 'medium' }]}>
                      פריט הזמנה {pageIndex * 3 + index + 1}
                    </Text>
                  </View>

                  {/* Ensure consistent spacing with fixed minHeight */}
                  <View style={[styles.itemRow, { marginBottom: 3, minHeight: 15 }]}>
                    <Text style={styles.itemLabel}>:מידות תמונה</Text>
                    <Text style={styles.itemValue}>
                      {item.width ? `${item.width}cm` : '-'} x{' '}
                      {item.height ? `${item.height}cm` : '-'}
                    </Text>
                  </View>

                  <View style={[styles.itemRow, { marginBottom: 3, minHeight: 15 }]}>
                    <Text style={styles.itemLabel}>:מספר מסגרת</Text>
                    <Text style={styles.itemValue}>{item.frame?.name || '-'}</Text>
                  </View>

                  <View style={[styles.itemRow, { marginBottom: 3, minHeight: 15 }]}>
                    <View style={{ flexDirection: 'row-reverse', gap: 12 }}>
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

                  {/* Always render checkbox row with consistent height */}
                  <View style={[styles.checkboxRow, { marginBottom: 3, minHeight: 15 }]}>
                    {Object.entries(
                      JSON.parse(String(item.glassTypes || '{}')) as Record<string, boolean>
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
                    {/* Add empty placeholder if no glass types to maintain consistent height */}
                    {(!item.glassTypes ||
                      Object.keys(JSON.parse(String(item.glassTypes || '{}'))).length === 0) && (
                      <Text style={styles.itemValue}>-</Text>
                    )}
                  </View>

                  {/* Always render adhesions section with consistent height */}
                  <View style={[styles.itemRow, { marginBottom: 3, minHeight: 20 }]}>
                    <Text style={styles.itemLabel}>:הדבקות</Text>
                    {item.adhesions?.length ? (
                      <View style={[styles.tagContainer, { gap: 2, minHeight: 16 }]}>
                        {item.adhesions.map((adhesion, i) => (
                          <Text key={i} style={[styles.tag, { fontSize: 9, padding: '1 3' }]}>
                            {adhesion.name}
                          </Text>
                        ))}
                      </View>
                    ) : (
                      <Text style={styles.itemValue}>-</Text>
                    )}
                  </View>

                  {/* Always render prints section with consistent height */}
                  <View style={[styles.itemRow, { marginBottom: 3, minHeight: 20 }]}>
                    <Text style={styles.itemLabel}>:הדפסות</Text>
                    {item.prints?.length ? (
                      <View style={[styles.tagContainer, { gap: 2, minHeight: 16 }]}>
                        {item.prints.map((print, i) => (
                          <Text key={i} style={[styles.tag, { fontSize: 9, padding: '1 3' }]}>
                            {print.name}
                          </Text>
                        ))}
                      </View>
                    ) : (
                      <Text style={styles.itemValue}>-</Text>
                    )}
                  </View>

                  {/* Always render descriptions section with consistent height */}
                  <View style={[styles.itemRow, { marginBottom: 3, minHeight: 20 }]}>
                    <Text style={styles.itemLabel}>:תיאור</Text>
                    {item.descriptions?.length ? (
                      <View style={[styles.tagContainer, { gap: 2, minHeight: 16 }]}>
                        {item.descriptions.map((description, i) => (
                          <Text key={i} style={[styles.tag, { fontSize: 9, padding: '1 3' }]}>
                            {description.name}
                          </Text>
                        ))}
                      </View>
                    ) : (
                      <Text style={styles.itemValue}>-</Text>
                    )}
                  </View>

                  {/* Ensure pricing section is consistently displayed */}
                  <View
                    style={[styles.printSection, { marginTop: 3, paddingTop: 3, minHeight: 16 }]}
                  >
                    <View style={[styles.sectionRow, { minHeight: 16 }]}>
                      <View style={{ flexDirection: 'row-reverse', gap: 12, alignItems: 'center' }}>
                        <View style={{ flexDirection: 'row-reverse', gap: 5 }}>
                          <Text style={styles.itemLabel}>:כמות</Text>
                          <Text style={styles.itemValue}>{item.quantity || '-'}</Text>
                        </View>
                        <View style={{ flexDirection: 'row-reverse', gap: 5 }}>
                          <Text style={styles.itemLabel}>:מחיר יחידה</Text>
                          <Text style={styles.itemValue}>₪{item.unitPrice || '0'}</Text>
                        </View>
                        <View style={{ flexDirection: 'row-reverse', gap: 5 }}>
                          <Text style={styles.itemLabel}>:מחיר</Text>
                          <Text style={styles.itemValue}>
                            ₪{(item.unitPrice || 0) * (item.quantity || 0)}
                          </Text>
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
