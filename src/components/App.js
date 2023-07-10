import React, { useState, useRef, useCallback } from "react";
import {
  Calendar,
  FocusTrapZone,
  Callout,
  DirectionalHint,
  DefaultButton,
  initializeIcons
} from "@fluentui/react";
import { useBoolean } from "@fluentui/react-hooks";
import { useTranslation } from "react-i18next";
import { getString } from "./getString";
initializeIcons();
const App = () => {
  const [selectedDate, setSelectedDate] = useState();
  const [
    showCalendar,
    { toggle: toggleShowCalendar, setFalse: hideCalendar }
  ] = useBoolean(false);
  const buttonContainerRef = useRef(null);
  const { t } = useTranslation();
  const calenderStrings = getString(t);
  const onSelectDate = useCallback(
    (date, dateRangeArray) => {
      setSelectedDate(date);
      hideCalendar();
    },
    [hideCalendar]
  );

  return (
    <div>
      <div ref={buttonContainerRef}>
        <DefaultButton
          onClick={toggleShowCalendar}
          text={
            !selectedDate
              ? "Click for Calendar"
              : selectedDate.toLocaleDateString()
          }
        />
      </div>
      {showCalendar && (
        <Callout
          isBeakVisible={false}
          gapSpace={0}
          doNotLayer={false}
          target={buttonContainerRef.current}
          directionalHint={DirectionalHint.bottomLeftEdge}
          onDismiss={hideCalendar}
          setInitialFocus
        >
          <FocusTrapZone isClickableOutsideFocusTrap>
            <Calendar
              onSelectDate={onSelectDate}
              onDismiss={hideCalendar}
              isMonthPickerVisible
              value={selectedDate}
              highlightCurrentMonth
              isDayPickerVisible
              showGoToToday
              // Calendar uses English strings by default. For localized apps, you must override this prop.
              strings={calenderStrings}
            />
          </FocusTrapZone>
        </Callout>
      )}
    </div>
  );
};

export default App;
