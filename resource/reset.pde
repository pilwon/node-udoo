/*
 * reset.pde
 *
 * This Arduino sketch resets all pins shared between
 * i.MX6 and SAM3X processors on UDOO board to INPUT mode.
 *
 * https://github.com/pilwon/node-udoo/
 */

void setup() {
  for (int i = 2; i <= 52; ++i) {
    pinMode(i, INPUT);
  }
}

void loop() {

}
