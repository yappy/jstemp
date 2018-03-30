BIN_PREFIX := ./node_modules/.bin/
BABEL_FLAGS := --source-maps inline
WEBPACK_FLAGS := --mode=development --devtool=inline-source-map

SRC_DIR := src
OUT_DIR := build
DIST_DIR := dist

JS := js
JS_SRCDIR := $(SRC_DIR)/$(JS)
JS_OUTDIR := $(OUT_DIR)/$(JS)
JS_SRCS := $(shell find $(JS_SRCDIR) -type f)
JS_OBJS := $(JS_SRCS:$(JS_SRCDIR)/%.js=$(JS_OUTDIR)/%.js)
JS_ENTRY := $(JS_OUTDIR)/index.js
JS_BUNDLE := $(JS_OUTDIR)/bundle.js
JS_DIST := $(DIST_DIR)/bundle.js

OTHER := web
OTHER_SRCDIR := $(SRC_DIR)/$(OTHER)
OTHER_OUTDIR := $(DIST_DIR)
OTHER_SRCS := $(shell find $(OTHER_SRCDIR) -type f)
OTHER_OBJS := $(OTHER_SRCS:$(OTHER_SRCDIR)/%=$(OTHER_OUTDIR)/%)


.PHONY: all js other
all: js other
js: $(JS_DIST)
other: $(OTHER_OBJS)

$(JS_DIST): $(JS_BUNDLE)
	mkdir -p $(dir $@)
	cp $< $@

$(JS_BUNDLE): $(JS_OBJS)
	$(BIN_PREFIX)webpack $(JS_OBJS) -o $@ $(WEBPACK_FLAGS)

$(JS_OUTDIR)/%.js: $(JS_SRCDIR)/%.js
	mkdir -p $(dir $@)
	$(BIN_PREFIX)babel $< -o $@ $(BABEL_FLAGS)

$(OTHER_OUTDIR)/%: $(OTHER_SRCDIR)/%
	mkdir -p $(dir $@)
	cp $< $@

.PHONY: clean
clean:
	rm -rf $(OUT_DIR) $(DIST_DIR)
