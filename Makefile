BIN_PREFIX := ./node_modules/.bin/
SRC_DIR := src
OUT_DIR := build
DIST_DIR := dist

JS := js
JS_SRCDIR := $(SRC_DIR)/$(JS)
JS_OUTDIR := $(OUT_DIR)/$(JS)
JS_SRCS := $(shell find $(JS_SRCDIR) -type f)
JS_OBJS := $(JS_SRCS:$(JS_SRCDIR)/%.js=$(JS_OUTDIR)/%.babel.js)
JS_BUNDLE := $(JS_OUTDIR)/bundle.js

OTHER := web
OTHER_SRCDIR := $(SRC_DIR)/$(OTHER)
OTHER_OUTDIR := $(OUT_DIR)/$(OTHER)
OTHER_SRCS := $(shell find $(OTHER_SRCDIR) -type f)
OTHER_OBJS := $(OTHER_SRCS:$(OTHER_SRCDIR)/%=$(OTHER_OUTDIR)/%)

$(warning $(JS_OBJS))
$(warning $(OTHER_OBJS))


.PHONY: all js other
all: js other
js: $(JS_BUNDLE)
other: $(OTHER_OBJS)


$(JS_BUNDLE): $(JS_OBJS)

$(JS_OUTDIR)/%.babel.js: $(JS_SRCDIR)/%.js
	mkdir -p $(dir $@)
	$(BIN_PREFIX)babel -o $@ $<

$(OTHER_OUTDIR)/%: $(OTHER_SRCDIR)/%
	mkdir -p $(dir $@)
	cp $< $@

.PHONY: clean
clean:
	rm -rf $(OUT_DIR) $(DIST_DIR)
