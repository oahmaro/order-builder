import { Document, Page, Text, View, StyleSheet, Image, Font } from '@react-pdf/renderer';
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
    marginBottom: 10,
    borderRadius: 4,
    padding: 16,
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
    marginBottom: 10,
  },
  orderItemCard: {
    marginBottom: 15,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
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
    gap: 20,
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
  itemImage: {
    width: 120,
    height: 120,
    objectFit: 'contain',
    marginBottom: 8,
    marginRight: 16,
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
    fontSize: 10,
    marginRight: 4,
  },
  checkboxRow: {
    flexDirection: 'row-reverse',
    gap: 15,
    marginVertical: 2,
  },
  imagePlaceholder: {
    width: 120,
    height: 120,
    backgroundColor: '#f5f5f5',
    borderRadius: 4,
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
        dialingCode: string;
        isPrimary: boolean;
      }[];
    };
    orderItems: (OrderItem & {
      adhesions: { name: string }[];
      frame?: { name: string } | null;
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

export function OrderPDF({ order, company }: OrderPDFProps) {
  const total = order.orderItems.reduce((sum, item) => sum + item.price, 0);
  const remaining = total - order.amountPaid;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
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
              <Text style={styles.label}> :שעה</Text>
              <Text style={styles.value}>
                {order.createdAt
                  ? `${new Date(order.createdAt).toLocaleDateString('en-US', {
                      weekday: 'short',
                      day: 'numeric',
                      month: 'short',
                    })} - ${new Date(order.createdAt).toLocaleTimeString('en-US', {
                      hour: '2-digit',
                      minute: '2-digit',
                      hour12: false,
                    })}`
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

        {order.orderItems.map((item, index) => (
          <View key={index} style={styles.orderItemCard}>
            <View style={styles.itemHeader}>
              <Text style={styles.itemTitle}>פריט {index + 1}</Text>
              <Text style={[styles.itemValue, { color: 'red' }]}>₪{item.price}</Text>
            </View>

            <View style={styles.itemContainer}>
              {item.image ? (
                <Image
                  src={getProxiedImageUrl(item.image)}
                  style={styles.itemImage}
                  cache={false}
                />
              ) : (
                <View style={styles.imagePlaceholder} />
              )}
              <View style={styles.itemContent}>
                <View style={styles.itemRow}>
                  <View style={{ flexDirection: 'row-reverse', gap: 5 }}>
                    <Text style={styles.itemLabel}>:מידות תמונה</Text>
                    <Text style={styles.itemValue}>
                      {item.width ? `${item.width}` : '-'} x {item.height ? `${item.height}` : '-'}
                    </Text>
                  </View>
                </View>

                <View style={styles.itemRow}>
                  <View style={{ flexDirection: 'row-reverse', gap: 5 }}>
                    <Text style={styles.itemLabel}>:מספר מסגרת</Text>
                    <Text style={styles.itemValue}>{item.frameId || '-'}</Text>
                  </View>
                </View>

                <View style={styles.itemRow}>
                  <View style={{ flexDirection: 'row-reverse', gap: 5 }}>
                    <Text style={styles.itemLabel}>:מספר פספרטו</Text>
                    <Text style={styles.itemValue}>{item.passepartoutNum || '-'}</Text>
                  </View>
                  <View style={{ flexDirection: 'row-reverse', gap: 5 }}>
                    <Text style={styles.itemLabel}>:רוחב פספרטו</Text>
                    <Text style={styles.itemValue}>{item.passepartoutWidth || '-'}</Text>
                  </View>
                </View>

                <View style={styles.checkboxRow}>
                  {Object.entries(
                    JSON.parse(String(item.glassTypes)) as Record<string, boolean>
                  ).map(([key, value]) => (
                    <Text key={key} style={styles.glassType}>
                      {`${value ? '☒' : '☐'} ${
                        key === 'transparent'
                          ? 'זכוכית שקופה'
                          : key === 'matte'
                          ? 'זכוכית מט'
                          : key === 'none'
                          ? 'ללא זכוכית'
                          : key === 'perspex'
                          ? 'פרספקס'
                          : key === 'mirror'
                          ? 'מראה'
                          : key
                      }`}
                    </Text>
                  ))}
                </View>

                <View style={styles.itemRow}>
                  <View style={{ flexDirection: 'row-reverse', gap: 5 }}>
                    <Text style={styles.itemLabel}>:הדבקות</Text>
                    <Text style={styles.itemValue}>
                      {item.adhesions?.length ? item.adhesions.map((a) => a.name).join(', ') : '-'}
                    </Text>
                  </View>
                </View>

                <View style={styles.itemRow}>
                  <View style={{ flexDirection: 'row-reverse', gap: 5 }}>
                    <Text style={styles.itemLabel}>:תיאור</Text>
                    <Text style={styles.itemValue}>{item.notes || '-'}</Text>
                  </View>
                </View>

                <View style={styles.itemRow}>
                  <View style={{ flexDirection: 'row-reverse', gap: 5 }}>
                    <Text style={styles.itemLabel}>:מחיר יחידה</Text>
                    <Text style={styles.itemValue}>₪{item.unitPrice}</Text>
                  </View>
                  <View style={{ flexDirection: 'row-reverse', gap: 5 }}>
                    <Text style={styles.itemLabel}>:כמות</Text>
                    <Text style={styles.itemValue}>{item.quantity}</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        ))}
      </Page>
    </Document>
  );
}
