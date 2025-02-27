import React from 'react';
import {
  processColor,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import PSPDFKitView from 'react-native-pspdfkit';

import {
  measurementsDocument,
  pspdfkitColor,
} from '../configuration/Constants';
import { BaseExampleAutoHidingHeaderComponent } from '../helpers/BaseExampleAutoHidingHeaderComponent';

class Measurement extends BaseExampleAutoHidingHeaderComponent {
  pdfRef: React.RefObject<PSPDFKitView>;

  constructor(props: any) {
    super(props);
    this.pdfRef = React.createRef();
  }

  onChangeScale = () => {
    this.pdfRef.current?.setMeasurementScale({
      unitFrom: 'mm',
      valueFrom: 1.0,
      unitTo: 'mi',
      valueTo: 1.0,
    });
  };

  onChangePrecision = () => {
    this.pdfRef.current?.setMeasurementPrecision('fourDP');
  };

  override render() {
    return (
      <View style={styles.flex}>
        <PSPDFKitView
          ref={this.pdfRef}
          document={measurementsDocument}
          configuration={{
            backgroundColor: processColor('lightgrey'),
            pageMode: 'single',
          }}
          fragmentTag="PDF1"
          style={styles.pdfColor}
        />
        <SafeAreaView>
          <View style={styles.column}>
            <View>
              <View style={styles.horizontalContainer}>
                <TouchableOpacity onPress={this.onChangePrecision}>
                  <Text style={styles.button}>{'Change precision'}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.onChangeScale}>
                  <Text style={styles.button}>{'Change scale'}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </SafeAreaView>
      </View>
    );
  }
}

export default Measurement;

const styles = {
  flex: { flex: 1 },
  pdfColor: { flex: 1, color: pspdfkitColor },
  column: {
    flexDirection: 'column' as 'column',
    alignItems: 'center' as 'center',
  },
  horizontalContainer: {
    flexDirection: 'row' as 'row',
    minWidth: '70%' as '70%',
    height: 50,
    justifyContent: 'space-between' as 'space-between',
    alignItems: 'center' as 'center',
  },
  button: {
    padding: 15,
    flex: 1,
    fontSize: 16,
    color: pspdfkitColor,
    textAlign: 'center' as 'center',
  },
};
